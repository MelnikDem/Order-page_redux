import { createSlice } from "@reduxjs/toolkit";
import { mainActions } from "./main-slice";

const initialState = {
  items: [],
  itemsQuantity: 0,
  isCartContentChanged: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.isCartContentChanged = true;
      state.itemsQuantity++;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.isCartContentChanged = true;
      state.itemsQuantity--;

      if (existingItem.quantity === 1) {
        state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    updateCart(state, action) {
      state.items = action.payload.items;
      state.itemsQuantity = action.payload.itemsQuantity;
    },
  },
});
export const cartActions = cartSlice.actions;

//Cart logic in Actions Creator
export const sendCartData = (cartData) => {
  return async (dispatchFn) => {
    dispatchFn(
      mainActions.showStatusMessage({
        status: "pending",
        title: "Transfering data",
        message: "Sending cart data",
      }) //method which create actions
    );

    const sendDataHttpRequest = async () => {
      const response = await fetch(
        "https://react-jokes-b425b-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cartData.items,
            itemsQuantity: cartData.itemsQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error when send cart data");
      }
    };

    try {
      await sendDataHttpRequest();
      dispatchFn(
        mainActions.showStatusMessage({
          status: "success",
          title: "Transfering cart data OK",
          message: "Cart data have been send SUCCESSFULLY",
        })
      );
    } catch (error) {
      dispatchFn(
        mainActions.showStatusMessage({
          status: "error",
          title: "Request error",
          message: "Fail of sending cart data to server",
        })
      );
    }
  };
};

export const getCartData = () => {
  return async (dispatchFn) => {
    const getDataHttpRequest = async () => {
      const response = await fetch(
        "https://react-jokes-b425b-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Error getting cart data");
      }
      const responseData = await response.json();
      return responseData;
    };
    try {
      const cartData = await getDataHttpRequest();
      dispatchFn(
        cartActions.updateCart({
          items: cartData.items || [],
          itemsQuantity: cartData.itemsQuantity,
        })
      );
    } catch (error) {
      dispatchFn(
        mainActions.showStatusMessage({
          status: "error",
          title: "request error",
          message: "Error of getting request cart data",
        })
      );
    }
  };
};

export default cartSlice;
