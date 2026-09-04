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
  bestSeller: boolean;
};

export default function KianCatalogPage() {
  const products = kianProducts as KianProduct[];

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <span>CATÁLOGO OFICIAL</span>
        <Image className={styles.logo} src="/brands/kian.svg" alt="Kian" width={240} height={80} priority />
        <p>Últimas oportunidades — produtos com até 50% de desconto</p>
      </header>

      <>
          <div className={styles.summary}>
            <div><strong>{products.length} produtos encontrados</strong><span>Catálogo local verificado com dados da Loja Kian.</span></div>
            <input className={styles.filterInput} id="best-sellers" type="checkbox" />
            <label className={styles.filter} htmlFor="best-sellers">Mais vendidos</label>
          </div>
          <section className={styles.grid} aria-label="Produtos Kian">
            {products.map((product) => {
              return (
                <article className={`${styles.card} ${product.bestSeller ? styles.bestSeller : ""}`} key={product.id}>
                  <div className={styles.image}>
                    {product.imageUrl ? <Image src={product.imageUrl} alt={product.imageAlt || product.name} fill sizes="(max-width: 600px) 50vw, 260px" /> : <span>Imagem indisponível</span>}
                  </div>
                  <div className={styles.content}>
                    {product.category && <span className={styles.category}>{product.category}</span>}
                    <h2>{product.name}</h2>
                    <p className={styles.reference}>Cód. {product.reference}</p>
                    {product.description && <p className={styles.description}>{product.description}</p>}
                  </div>
                </article>
              );
            })}
          </section>
        </>

      <footer>
        Snapshot local do catálogo. Produtos e disponibilidade são atualizados somente durante manutenção programada. Fonte: Loja Kian.
      </footer>
    </main>
  );
}
