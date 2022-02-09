import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import ProductList from '../ProductList/ProductList';
import ProductForm from '../ProductForm/ProductForm';
import Checkout from '../Checkout/Checkout';
import { useCheckout } from '../../hooks/useCheckout';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [checkoutUpdated, setCheckoutUpdated] = useState(false);
  const { checkoutCount } = useCheckout(checkoutUpdated);

  useEffect(() => {
    if (checkoutCount) {
      setCheckoutUpdated(false);
    }
  }, [checkoutCount]);

  const updateCheckoutCount = () => {
    setCheckoutUpdated(true);
  };

  return (
    <Router>
      <ToastContainer />
      <section className="app-wrapper">
        <Navbar checkoutCount={checkoutCount} />
        <article className="app-container">
          <Route exact path="/" component={Home} />
          <Route path="/my-products">
            <ProductList updateCheckoutCount={updateCheckoutCount} />
          </Route>
          <Route exact path="/new-product-form" component={ProductForm} />
          <Route exact path="/checkout">
            <Checkout updateCheckoutCount={updateCheckoutCount} />
          </Route>
        </article>
      </section>
    </Router>
  );
};

export default App;
