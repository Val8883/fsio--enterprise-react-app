import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import ProductList from '../ProductList/ProductList';
import ProductForm from '../ProductForm/ProductForm';
import Checkout from '../Checkout/Checkout';
import * as checkoutApi from '../../services/checkoutApi';
import { FETCH_CHECKOUT_COUNT_ERROR } from '../../constants/constants';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [checkoutCount, setCheckoutCount] = useState(0);
  const [cartUpdated, setCartUpdated] = useState(false);

  useEffect(() => {
    const fetchCheckoutItems = async () => {
      const checkoutItemsCount = await checkoutApi.getCheckoutCount();
      if (
        Number(checkoutItemsCount) ||
        checkoutItemsCount === 0 ||
        checkoutItemsCount === FETCH_CHECKOUT_COUNT_ERROR
      ) {
        setCartUpdated(false);
        setCheckoutCount(checkoutItemsCount);
      }
    };

    fetchCheckoutItems();
  }, [checkoutCount, cartUpdated]);

  const updateCheckoutCount = () => {
    setCartUpdated(true);
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
