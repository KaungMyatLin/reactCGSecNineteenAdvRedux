import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from '../store/ui-slice'
const cartSlice = createSlice({
  name: "cartSlceN",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    // replaceCart is alternative to addItmToCart, this reducer wont do a lot of work, just mutate-assignment, it is fat-component.
    // replaceCart(state, action) {
    //   state.totalQuantity = action.payload.totalQuantity;
    //   state.items = action.payload.items;
    // },
    // addItmToCart reducer do a lot of work, it is fat-reducer.
    // ** important: use fat-reducer for synchronous & pure code. put asynchronous & side effect in component only. **
    addItmToCart(state, action) {
      const newitem = action.payload;
      const existItm = state.items.find((itm) => itm.id === newitem.id);
      state.totalQuantity++;
      if (!existItm) {
        state.items.push({
          id: newitem.id,
          price: newitem.price,
          quantity: 1,
          totalPrice: newitem.price,
          title: newitem.title,
        });
      }
      else {
        existItm.quantity++;
        existItm.totalPrice = existItm.totalPrice + newitem.price;
      }
    },
    rmItmToCart(state, action) {
        state.totalQuantity--;
        const id = action.payload;
        const existItm = state.items.find(itm => itm.id === id);
        if (existItm.quantity === 1){
            state.items = state.items.filter(itm => itm.id !== id);
        }
        else {
            existItm.quantity--;
            existItm.totalPrice = existItm.totalPrice - existItm.price;
        }
    },
  },
});

// Thunk, a funciton that delays an action until later.
// sendCartData is an action-creator if func simply returns {type: '', payload:''}.
// rctTlkit also accepts action-creator that return function instead obj, executes it for you.
// Pattern that accepts dispatch given as arguement, utilize it to dispatch again and again
// depending on the side-effect.
// It is just a separate standalone func bcoz func is doing side-effects
// before reaching any dispatch logic and reaching reducer. 
// Only when reaching reducer, the func will be regarded as "action-creator".
// Export it bcoz want to use the func.
export const sendCartData = (cart) => {
  return async (dispatch) => {
    // rctTlKit will auto give dispatch arguement.
    dispatch(
      uiActions.showNotif({
        status: "pending",
        title: "sending...",
        message: "sending cart data",
      }));
    const sendReq = async () => {
      const resp = await fetch(
        "https://reactcgsecnineteenadvredux-default-rtdb.asia-southeast1.firebasedatabase.app/carts.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!resp.ok) {
        throw new Error("sending failed");
      }
    }
    try {
      await sendReq();
      dispatch(
        uiActions.showNotif({
          status: "success",
          title: "Success!",
          message: "sent cart data",
        })
      );
    }
    catch (err) {
      dispatch(
        uiActions.showNotif({
          status: "error",
          title: "Error!",
          message: "sending cart data failed",
        })
      );
    }
  }
}
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
