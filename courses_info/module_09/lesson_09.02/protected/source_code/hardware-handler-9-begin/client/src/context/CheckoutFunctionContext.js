import { createContext } from 'react';

const CheckoutFunctionContext = createContext({
  removeItemFromCheckout: () => {},
});

export default CheckoutFunctionContext;
