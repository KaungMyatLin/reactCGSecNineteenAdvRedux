import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { cartActions } from "../../store/cart-slice";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  // const cart = useSelector((state) => state.cartSlceRdr);
  const { title, price, description, id } = props;
  const addItmToCartH = () => {
    // const newTotalQuantity = cart.totalQuantity + 1;

    // const updatedItems = cart.items.slice();
    // const existingItem = updatedItems.find((itm) => itm.id === id);
    // if (existingItem) {
    //   const updatedItem = { ...existingItem };
    //   updatedItem.quantity++;
    //   updatedItem.totalPrice = updatedItem.totalPrice + price;
    //   const existingItemIdx = updatedItems.findIndex((itm) => itm.id === id);
    //   updatedItems[existingItemIdx] = updatedItem;
    // }
    // else {
    //   updatedItems.push({
    //     id,
    //     price,
    //     quantity: 1,
    //     totalPrice: price,
    //     title,
    //   })
    // }
    // const newCart = {
    //   totalQuantity: newTotalQuantity,
    //   items: updatedItems,
    // }
    // dispatch(cartActions.replaceCart(newCart));
    dispatch(cartActions.addItmToCart({id, title, price}));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addItmToCartH}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
