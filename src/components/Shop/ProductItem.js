import Card from "../UI/Card";
import styles from "./ProductItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const ProductItem = (props) => {
  // const cart = useSelector((state) => state.cart);
  const dispatchFn = useDispatch();
  const { id, title, price, description } = props;

  const addItemHandler = () => {
    // const updatedItemsQuantity = cart.itemsQuantity + 1; //update variable, not redux storage with our states
    // const updatedItems = cart.items.slice();
    // const existingItem = updatedItems.find((item) => item.id === id);
    // console.log(existingItem);
    // if (existingItem) {
    //   const updatedExistingItem = { ...existingItem };
    //   console.log(updatedExistingItem);
    //   updatedExistingItem.quantity++;
    //   updatedExistingItem.totalPrice = updatedExistingItem.totalPrice + price;
    //   const existingItemIndex = updatedItems.findIndex(
    //     (item) => item.id === id
    //   );
    //   updatedItems[existingItemIndex] = updatedExistingItem;
    // } else {
    //   updatedItems.push({
    //     id: id,
    //     price: price,
    //     quantity: 1,
    //     totalPrice: price,
    //     title: title,
    //   });
    // }
    // const updatedCart = {
    //   itemsQuantity: updatedItemsQuantity,
    //   items: updatedItems,
    // };
    // dispatchFn(cartActions.updateCart(updatedCart));

    dispatchFn(
      cartActions.addItem({
        id,
        title,
        price,
      })
    ); //used to add items to cart
  };

  return (
    <li className={styles.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={styles.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={styles.actions}>
          <button onClick={addItemHandler}>Добавить в Корзину</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
