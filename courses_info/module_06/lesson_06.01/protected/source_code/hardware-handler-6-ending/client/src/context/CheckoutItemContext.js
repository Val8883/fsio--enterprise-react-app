import { createContext } from 'react';

const CheckoutItemContext = createContext({
  checkoutCount: 0,
  updateCheckoutCount: () => {},
  error: false,
  checkoutItems: [],
  setCheckoutItems: () => {},
});

export default CheckoutItemContext;
