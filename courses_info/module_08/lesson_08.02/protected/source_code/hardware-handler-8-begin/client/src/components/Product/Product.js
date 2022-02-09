import { useContext } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../helpers/formatPrice';
import ProductFunctionContext from '../../context/ProductFunctionContext';
import './Product.css';

const Product = ({ product }) => {
  const productFunctionContext = useContext(ProductFunctionContext);

  return (
    <div key={product.id} className="product">
      <div>
        <h3 className="product-name">{product.name}</h3>
      </div>
      <dl>
        <dt>Brand:</dt>
        <dd>{product.brand}</dd>
        <dt>Retail Price:</dt>
        <dd>{formatPrice(product.retailPrice)}</dd>
        <dt>Description:</dt>
        <dd>{product.description}</dd>
      </dl>
      <div className="product-button-wrapper">
        <button
          type="submit"
          className="primary"
          onClick={() => productFunctionContext.addItemToCheckout(product)}
        >
          Add to Checkout
        </button>
      </div>
    </div>
  );
};

export default Product;

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    retailPrice: PropTypes.number.isRequired,
  }).isRequired,
};
