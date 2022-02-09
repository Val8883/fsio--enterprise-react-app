import { useState, useEffect } from 'react';
import { FETCH_CHECKOUT_PRODUCTS_ERROR } from '../constants/constants';
import * as checkoutApi from '../services/checkoutApi';

const useCheckout = (checkoutUpdated) => {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [error, setError] = useState(false);
  const [checkoutCount, setCheckoutCount] = useState(0);

  useEffect(() => {
    const fetchCheckoutItems = async () => {
      const allCheckoutItems = await checkoutApi.getAllCheckoutItems();
      if (allCheckoutItems !== FETCH_CHECKOUT_PRODUCTS_ERROR) {
        setCheckoutItems(allCheckoutItems);
      } else {
        setError(true);
      }
    };

    fetchCheckoutItems();
  }, [checkoutUpdated]);

  useEffect(() => {
    if (Number(checkoutItems.length) || checkoutItems.length === 0) {
      setCheckoutCount(checkoutItems.length);
    }
  }, [checkoutItems]);

  return { checkoutItems, setCheckoutItems, checkoutCount, error };
};

export { useCheckout };
