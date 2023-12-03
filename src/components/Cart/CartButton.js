import { mainActions } from "../../store/main-slice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatchFn = useDispatch();
  const itemsQuantity = useSelector((state) => state.cart.itemsQuantity);

  const cardButtonHandler = () => {
    dispatchFn(mainActions.toggleCardVisibility());
  };

  return (
    <button onClick={cardButtonHandler} className={styles.button}>
      <span>Корзина</span>
      <span className={styles.badge}>{itemsQuantity}</span>
    </button>
  );
};

export default CartButton;
