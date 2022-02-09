import { createContext } from 'react';

const ProductFunctionContext = createContext({
  addItemToCheckout: () => {},
});

export default ProductFunctionContext;
