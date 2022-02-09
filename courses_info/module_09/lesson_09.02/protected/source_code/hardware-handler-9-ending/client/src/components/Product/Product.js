import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'antd';
import { formatPrice } from '../../helpers/formatPrice';
import ProductFunctionContext from '../../context/ProductFunctionContext';
import './Product.css';

const Product = ({ product }) => {
  const productFunctionContext = useContext(ProductFunctionContext);

  return (
    <Card
      title={product.name}
      bordered={false}
      key={product.id}
      className="product"
    >
      <dl>
        <dt>Brand:</dt>
        <dd>{product.brand}</dd>
        <dt>Retail Price:</dt>
        <dd>{formatPrice(product.retailPrice)}</dd>
        <dt>Description:</dt>
        <dd>{product.description}</dd>
      </dl>
      <div className="product-button-wrapper">
        <Button
          type="primary"
          size="large"
          onClick={() => productFunctionContext.addItemToCheckout(product)}
        >
          Add to Checkout
        </Button>
      </div>
    </Card>
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
