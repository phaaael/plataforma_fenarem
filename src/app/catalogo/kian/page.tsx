import Image from "next/image";
import kianProducts from "@/data/kian-products.json";
import styles from "./styles.module.css";

type KianProduct = {
  id: string;
  name: string;
  reference: string;
  description: string;
  category: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
  price: number | null;
  listPrice: number | null;
  available: boolean;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export default function KianCatalogPage() {
  const products = kianProducts as KianProduct[];

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <span>CATÁLOGO OFICIAL</span>
        <h1>KIAN</h1>
        <p>Últimas oportunidades — produtos com até 50% de desconto</p>
      </header>

      <>
          <div className={styles.summary}>
            <strong>{products.length} produtos encontrados</strong>
            <span>Catálogo local verificado com dados da Loja Kian.</span>
          </div>
          <section className={styles.grid} aria-label="Produtos Kian">
            {products.map((product) => {
              return (
                <article className={styles.card} key={product.id}>
                  <div className={styles.image}>
                    {product.imageUrl ? <Image src={product.imageUrl} alt={product.imageAlt || product.name} fill sizes="(max-width: 600px) 50vw, 260px" /> : <span>Imagem indisponível</span>}
                  </div>
                  <div className={styles.content}>
                    {product.category && <span className={styles.category}>{product.category}</span>}
                    <h2>{product.name}</h2>
                    <p className={styles.reference}>Cód. {product.reference}</p>
                    {product.description && <p className={styles.description}>{product.description}</p>}
                    {product.available && product.price !== null && (
                      <div className={styles.price}>
                        {product.listPrice !== null && product.listPrice > product.price && <del>{formatPrice(product.listPrice)}</del>}
                        <strong>{formatPrice(product.price)}</strong>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        </>

      <footer>
        Snapshot local do catálogo. Produtos, preços e disponibilidade são atualizados somente durante manutenção programada. Fonte: Loja Kian.
      </footer>
    </main>
  );
}
