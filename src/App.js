import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
// import { sendCartData } from "./store/cart-slice";
import { sendCartData } from "./store/cart-actions";
import Notification from "./components/UI/Notification";
let isjustInitiated = true;
function App() {
  const showCartOrN = useSelector((state) => state.uiSlceRdr.cartIsVisible);
  const cart = useSelector((state) => state.cartSlceRdr);
  const dispatch = useDispatch();
  const notific = useSelector((state) => state.uiSlceRdr.notific);
  useEffect(() => {
    // moved logic to separate standlone func in cart-slice.js.
    // const sendCartData = async () => {
    //   dispatch(
    //     uiActions.showNotif({
    //       status: "pending",
    //       title: "sending...",
    //       message: "sending cart data",
    //     })
    //   );
    //   const resp = await fetch(
    //     "https://reactcgsecnineteenadvredux-default-rtdb.asia-southeast1.firebasedatabase.app/carts.json",
    //     {
    //       method: "PUT",
    //       body: JSON.stringify(cart),
    //     }
    //   );
    //   if (!resp.ok) {
    //     throw new Error("sending failed");
    //   }
    //   dispatch(
    //     uiActions.showNotif({
    //       status: "success",
    //       title: "Success!",
    //       message: "sent cart data",
    //     })
    //   );
    // };
    // if (isjustInitiated) {
    //   isjustInitiated = false;
    //   return;
    // }
    // sendCartData().catch((err) => {
    //   dispatch(
    //     uiActions.showNotif({
    //       status: "error",
    //       title: "Error!",
    //       message: "sending cart data failed",
    //     })
    //   );
    // });
    if (isjustInitiated) {
      isjustInitiated = false;
      return;
    }
    dispatch(sendCartData(cart));
    // dispatch as dependency bocz need to add any reference type to the dependency array.
  }, [cart]);
  return (
    <Fragment>
      {notific && (
        <Notification
          status={notific.status}
          title={notific.title}
          message={notific.message}
        />
      )}
      <Layout>
        {showCartOrN && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
