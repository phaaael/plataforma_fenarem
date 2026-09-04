import { readFile, writeFile } from "node:fs/promises";

const catalogFile = new URL("../src/data/kian-products.json", import.meta.url);
const categoryApi = "https://www.lojakian.com.br/api/catalog_system/pub/products/search/ultimas-oportunidades---ate-50-off?map=c";
const productApi = "https://www.lojakian.com.br/api/catalog_system/pub/products/search";
const pageSize = 50;

async function request(url) {
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Kian API request failed: ${response.status}`);
  return response;
}

function normalize(product) {
  const item = product.items?.[0];
  const image = item?.images?.[0];
  return {
    id: product.productId,
    name: product.productName,
    reference: product.productReference,
    description: product.description || "",
    category: product.categories?.[0]?.split("/").filter(Boolean).at(-1) || "",
    link: product.link,
    imageUrl: image?.imageUrl || "",
    imageAlt: image?.imageText || product.productName,
  };
}

async function fetchPage(from) {
  const response = await request(`${categoryApi}&_from=${from}&_to=${from + pageSize - 1}`);
  const products = await response.json();
  const total = Number(response.headers.get("resources")?.split("/").at(-1) || products.length);
  return { products, total };
}

async function fetchAll() {
  const first = await fetchPage(0);
  const remaining = await Promise.all(
    Array.from({ length: Math.ceil(first.total / pageSize) - 1 }, (_, index) => fetchPage((index + 1) * pageSize)),
  );
  return [first, ...remaining].flatMap((page) => page.products).map(normalize);
}

async function fetchOne(id) {
  const response = await request(`${productApi}?fq=productId:${encodeURIComponent(id)}`);
  const products = await response.json();
  if (!products[0]) throw new Error(`Product ${id} was not found`);
  return normalize(products[0]);
}

async function readCatalog() {
  try {
    return JSON.parse(await readFile(catalogFile, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

const id = process.argv.find((argument) => argument.startsWith("--id="))?.slice(5);
const removeId = process.argv.find((argument) => argument.startsWith("--remove="))?.slice(9);
let products = await readCatalog();

if (removeId) {
  const previousLength = products.length;
  products = products.filter((product) => product.id !== removeId);
  if (products.length === previousLength) throw new Error(`Product ${removeId} is not in the local catalog`);
  console.log(`Removed product ${removeId}`);
} else if (id) {
  const product = await fetchOne(id);
  const index = products.findIndex((item) => item.id === id);
  if (index >= 0) products[index] = product;
  else products.push(product);
  console.log(`${index >= 0 ? "Updated" : "Added"} product ${id}`);
} else {
  products = await fetchAll();
  console.log(`Synchronized ${products.length} products`);
}

await writeFile(catalogFile, `${JSON.stringify(products, null, 2)}\n`, "utf8");
