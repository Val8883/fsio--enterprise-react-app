import { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { notification } from 'antd';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import Loader from '../../components/Loader/Loader';
import {
  FETCH_CHECKOUT_PRODUCTS_ERROR,
  REMOVE_PRODUCT_FROM_CHECKOUT_ERROR,
  PRODUCT_REMOVED_FROM_CHECKOUT_SUCCESS,
} from '../../constants/constants';
import * as checkoutApi from '../../services/checkoutApi';
import CheckoutItemContext from '../../context/CheckoutItemContext';
import CheckoutFunctionContext from '../../context/CheckoutFunctionContext';
import './Checkout.css';

const Checkout = () => {
  const [loading, setLoading] = useState(true);
  const checkoutItemContext = useContext(CheckoutItemContext);

  useEffect(() => {
    if (checkoutItemContext.checkoutItems || checkoutItemContext.error) {
      setLoading(false);
    }
  }, [checkoutItemContext.checkoutItems, checkoutItemContext.error]);

  const removeItemFromCheckout = async (id) => {
    setLoading(true);
    const remainingCheckoutItems = await checkoutApi.removeProductFromCheckout(
      id
    );
    if (remainingCheckoutItems !== REMOVE_PRODUCT_FROM_CHECKOUT_ERROR) {
      checkoutItemContext.setCheckoutItems(remainingCheckoutItems);
      checkoutItemContext.updateCheckoutCount();
      notification.success({
        description: PRODUCT_REMOVED_FROM_CHECKOUT_SUCCESS,
        closeIcon: <div />,
      });
    } else {
      notification.error({
        description: remainingCheckoutItems,
        closeIcon: <div />,
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="checkout-title">Checkout Page</h1>
      <div>
        {loading ? <Loader message="Fetching items in checkout..." /> : null}
        {checkoutItemContext.error ? (
          <p className="checkout-message">
            {FETCH_CHECKOUT_PRODUCTS_ERROR} Please refresh the page or try again
            later.
          </p>
        ) : null}
        {!loading &&
        !checkoutItemContext.error &&
        checkoutItemContext.checkoutItems.length ? (
          <div>
            <div className="checkout-header">
              <div>Product Information</div>
              <div>Suggested Retail Price</div>
              <div>Update Checkout</div>
            </div>
            <CheckoutFunctionContext.Provider
              value={{ removeItemFromCheckout }}
            >
              <ul className="checkout-list-wrapper">
                {checkoutItemContext.checkoutItems.map((item) => (
                  <CheckoutItem key={item.id} item={item} />
                ))}
              </ul>
            </CheckoutFunctionContext.Provider>
          </div>
        ) : null}
        {!loading &&
        !checkoutItemContext.error &&
        !checkoutItemContext.checkoutItems.length ? (
          <p className="checkout-message">
            The checkout is currently empty. Add some items from the&nbsp;
            <NavLink className="page-link" to="/my-products">
              My Products
            </NavLink>
            &nbsp;page.
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Checkout;
