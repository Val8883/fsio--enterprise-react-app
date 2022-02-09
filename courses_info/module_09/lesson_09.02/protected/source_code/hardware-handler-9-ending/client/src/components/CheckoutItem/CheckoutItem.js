import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { formatPrice } from '../../helpers/formatPrice';
import CheckoutFunctionContext from '../../context/CheckoutFunctionContext';
import './CheckoutItem.css';

const CheckoutItem = ({ item }) => {
  const checkoutFunctionContext = useContext(CheckoutFunctionContext);
  const { name, brand, description, retailPrice } = item;

  return (
    <li className="checkout-item">
      <div>
        <div className="checkout-item-wrapper">
          <div className="checkout-item-data strong">{name}</div>
          <div className="checkout-item-data">
            <span className="strong">By: </span>
            <span>{brand}</span>
          </div>
          <div className="checkout-item-wrapper">{description}</div>
        </div>
      </div>
      <div className="checkout-item-price strong">
        {formatPrice(retailPrice)}
      </div>
      <div>
        <Button
          type="primary"
          size="large"
          onClick={() =>
            checkoutFunctionContext.removeItemFromCheckout(item.id)
          }
        >
          Remove Product from Checkout
        </Button>
      </div>
    </li>
  );
};

export default CheckoutItem;

CheckoutItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    retailPrice: PropTypes.number.isRequired,
  }).isRequired,
};
