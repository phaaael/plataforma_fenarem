import Image from "next/image";
import styles from "./styles.module.css";

export const revalidate = 3600;

const KIAN_API = "https://www.lojakian.com.br/api/catalog_system/pub/products/search/ultimas-oportunidades---ate-50-off?map=c";
const PAGE_SIZE = 50;

type ProductImage = { imageUrl: string; imageText?: string };
type CommercialOffer = { Price: number; ListPrice: number; IsAvailable: boolean };
type ProductItem = { images: ProductImage[]; sellers: Array<{ commertialOffer: CommercialOffer }> };
type KianProduct = {
  productId: string;
  productName: string;
  productReference: string;
  description: string;
  categories: string[];
  link: string;
  items: ProductItem[];
};

async function getProductPage(from: number) {
  const response = await fetch(`${KIAN_API}&_from=${from}&_to=${from + PAGE_SIZE - 1}`, {
    headers: { Accept: "application/json" },
    next: { revalidate },
  });

  if (!response.ok) throw new Error(`Kian catalog request failed: ${response.status}`);
  const products = await response.json() as KianProduct[];
  const total = Number(response.headers.get("resources")?.split("/").at(-1) || products.length);
  return { products, total };
}

async function getProducts(): Promise<KianProduct[]> {
  const firstPage = await getProductPage(0);
  const remainingPages = Array.from(
    { length: Math.ceil(firstPage.total / PAGE_SIZE) - 1 },
    (_, index) => getProductPage((index + 1) * PAGE_SIZE),
  );
  const pages = await Promise.all(remainingPages);
  return [firstPage, ...pages].flatMap((page) => page.products);
}

function getOffer(product: KianProduct) {
  return product.items[0]?.sellers.find((seller) => seller.commertialOffer.IsAvailable)?.commertialOffer;
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export default async function KianCatalogPage() {
  let products: KianProduct[] = [];
  let unavailable = false;

  try {
    products = await getProducts();
  } catch {
    unavailable = true;
  }

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <span>CATÁLOGO OFICIAL</span>
        <h1>KIAN</h1>
        <p>Últimas oportunidades — produtos com até 50% de desconto</p>
      </header>

      {unavailable ? (
        <section className={styles.status}>
          <h2>Catálogo temporariamente indisponível</h2>
          <p>Não foi possível consultar os produtos da Kian agora. Tente novamente em instantes.</p>
        </section>
      ) : (
        <>
          <div className={styles.summary}>
            <strong>{products.length} produtos encontrados</strong>
            <span>Informações fornecidas pela API oficial da Loja Kian.</span>
          </div>
          <section className={styles.grid} aria-label="Produtos Kian">
            {products.map((product) => {
              const image = product.items[0]?.images[0];
              const offer = getOffer(product);
              const category = product.categories[0]?.split("/").filter(Boolean).at(-1);

              return (
                <article className={styles.card} key={product.productId}>
                  <div className={styles.image}>
                    {image ? <Image src={image.imageUrl} alt={image.imageText || product.productName} fill sizes="(max-width: 600px) 50vw, 260px" /> : <span>Imagem indisponível</span>}
                  </div>
                  <div className={styles.content}>
                    {category && <span className={styles.category}>{category}</span>}
                    <h2>{product.productName}</h2>
                    <p className={styles.reference}>Cód. {product.productReference}</p>
                    {product.description && <p className={styles.description}>{product.description}</p>}
                    {offer && (
                      <div className={styles.price}>
                        {offer.ListPrice > offer.Price && <del>{formatPrice(offer.ListPrice)}</del>}
                        <strong>{formatPrice(offer.Price)}</strong>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        </>
      )}

      <footer>
        Produtos, preços e disponibilidade podem mudar sem aviso. Fonte: Loja Kian.
      </footer>
    </main>
  );
}
