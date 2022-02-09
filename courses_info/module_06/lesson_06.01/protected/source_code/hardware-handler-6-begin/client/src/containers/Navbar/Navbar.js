import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './Navbar.css';

const Navbar = ({ checkoutCount }) => (
  <nav className="navbar">
    <div className="navbar-home-link">
      <NavLink exact to="/">
        Hardware Handler
        <FontAwesomeIcon className="navbar-icon" icon={faTools} />
      </NavLink>
    </div>
    <span className="navbar-links-wrapper">
      <NavLink exact to="/my-products">
        My Products
      </NavLink>
      <NavLink exact to="/new-product-form">
        Add New Products
      </NavLink>
      <NavLink className="navbar-link" exact to="/checkout">
        Checkout
        <FontAwesomeIcon className="navbar-icon" icon={faShoppingCart} />
        {checkoutCount > 0 ? (
          <p className="navbar-checkout-count">: {checkoutCount}</p>
        ) : null}
      </NavLink>
    </span>
  </nav>
);

export default Navbar;

Navbar.propTypes = {
  checkoutCount: PropTypes.number.isRequired,
};
