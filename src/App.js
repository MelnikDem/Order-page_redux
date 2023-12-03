import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import StatusBarMessage from "./components/UI/StatusBarMessage";
import { sendCartData, getCartData } from "./store/cart-slice";

let isInitialRunning = true;

function App() {
  const isCardVisible = useSelector((state) => state.main.isCardVisible);
  const cart = useSelector((state) => state.cart);
  const statusMessage = useSelector((state) => state.main.statusMessage);

  const dispatchFn = useDispatch();

  useEffect(() => {
    dispatchFn(getCartData());
  }, []);

  useEffect(() => {
    if (isInitialRunning) {
      isInitialRunning = false;
      return;
    }

    if (cart.isCartContentChanged) {
      dispatchFn(sendCartData(cart));
    }
  }, [cart]);
  // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatchFn(
  //       mainActions.showStatusMessage({
  //         status: "pending",
  //         title: "Transfering data",
  //         message: "Sending cart data",
  //       }) //Action creator - method which create actions
  //     );
  //     const response = await fetch(
  //       "https://react-jokes-b425b-default-rtdb.firebaseio.com/cart.json",
  //       {
  //         method: "PUT",
  //         body: JSON.stringify(cart),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Error when send cart data"); //не получили ошибку - значит успешно оправил
  //     }
  //     // const responseData = await response.json();

  //     dispatchFn(
  //       mainActions.showStatusMessage({
  //         status: "success",
  //         title: "Transfering data OK",
  //         message: "Cart data have been send SUCCESSFULLY",
  //       })
  //     );
  //   };
  //   if (isInitialRunning) {
  //     isInitialRunning = false;
  //     return;
  //   }
  //   sendCartData().catch((e) => {
  //     dispatchFn(
  //       mainActions.showStatusMessage({
  //         status: "error",
  //         title: "connection error",
  //         message: "Sending cart data error",
  //       })
  //     );
  //   });
  // }, [cart, dispatchFn]);

  return (
    <Fragment>
      {statusMessage && (
        <StatusBarMessage
          status={statusMessage.status}
          title={statusMessage.title}
          message={statusMessage.message}
        />
      )}

      <Layout>
        {isCardVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
