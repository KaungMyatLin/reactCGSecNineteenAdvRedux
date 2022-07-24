import { uiActions } from './ui-slice'
import { cartActions } from './cart-slice'

export const fetchCartData = () => {
  // async bcoz await inside asynchronous try-catch.
  return async (dispatch) => {
    // async bcoz await for fetch and another is await resp.json.
    const fetchData = async() => {
      const resp = await fetch("https://reactcgsecnineteenadvredux-default-rtdb.asia-southeast1.firebasedatabase.app/carts.json");
      if (!resp.ok) {
        throw new Error('could not fetch cart data...');
      }
      const data = await resp.json();
      return data;
    }
    try {
      // await bcoz inside asynchronous try-catch.
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(
        {
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity
        }
      ))
    }
    catch (err) {
      dispatch(
        uiActions.showNotif({
          status: "error",
          title: "Error!",
          message: "fetching cart data failed",
        })
      );
    }
  }
}
export const sendCartData = (cart) => {
  return async (dispatch) => {
    // rctTlKit will auto give dispatch arguement.
    dispatch(
      uiActions.showNotif({
        status: "pending",
        title: "sending...",
        message: "sending cart data",
      })
    );
    const sendReq = async () => {
      const resp = await fetch(
        "https://reactcgsecnineteenadvredux-default-rtdb.asia-southeast1.firebasedatabase.app/carts.json",
        {
          // firebase will take the req and store it as it is.
          // but in Http section, we use 'POST', we let firebase create a list of data, 
          // which turn out to be an obj when we fetch it.
          method: "PUT",
          body: JSON.stringify({ items: cart.items, totalQuantity: cart.totalQuantity }),
        }
      );
      if (!resp.ok) {
        throw new Error("sending failed");
      }
    };
    try {
      await sendReq();
      dispatch(
        uiActions.showNotif({
          status: "success",
          title: "Success!",
          message: "sent cart data",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotif({
          status: "error",
          title: "Error!",
          message: "sending cart data failed",
        })
      );
    }
  };
};
