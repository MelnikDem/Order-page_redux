import ProductItem from "./ProductItem";
import styles from "./Products.module.css";

const DUMMY_ITEMS = [
  {
    id: "1",
    price: 10,
    title: "Товар 1",
    description: "Цей супер товар 1 надійний і слижитиме довго",
  },
  {
    id: "2",
    price: 20,
    title: "Товар 2",
    description: "Цей супер товар 2 надійний і слижитиме довго",
  },
  {
    id: "3",
    price: 30,
    title: "Товар 3",
    description: "Цей супер товар 3 надійний і слижитиме довго",
  },
];
const Products = (props) => {
  return (
    <section className={styles.products}>
      <h2>В нашем магазине товары самого высокого качества</h2>
      <ul>
        {DUMMY_ITEMS.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            price={item.price}
            title={item.title}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
