import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
const Cart = (props) => {
  const cartItems = useSelector((state) => state.cartSlceRdr.items);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((itm) => (
          <CartItem
            item={{
              id: itm.id,
              title: itm.title,
              quantity: itm.quantity,
              total: itm.totalPrice,
              price: itm.price,
            }}
          />
        ))}
      </ul>
    </Card>
  );
};
export default Cart;
