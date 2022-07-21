import ProductItem from './ProductItem';
import classes from './Products.module.css';
const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    quantity: 1,
    title: 'My first book',
    description: 'This is a first product - amazing!'
  },
  {
    id: 'p2',
    price: 5,
    quantity: 1,
    title: 'My second book',
    description: 'This is a second product - amazing!'
  },
]
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        { DUMMY_PRODUCTS.map(pdct => (
          <ProductItem
            key = { pdct.id }
            id = { pdct.id }
            title={ pdct.title }
            price={ pdct.price }
            description= { pdct.description }
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
