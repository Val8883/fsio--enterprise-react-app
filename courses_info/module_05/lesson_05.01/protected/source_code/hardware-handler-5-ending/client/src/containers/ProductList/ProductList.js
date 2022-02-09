import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Product from '../../components/Product/Product';
import Loader from '../../components/Loader/Loader';
import {
  PRODUCT_ADDED_TO_CHECKOUT_SUCCESS,
  FETCH_DEPARTMENT_DATA_ERROR,
  FETCH_PRODUCT_DATA_ERROR,
  MULTIPLE_ERRORS,
} from '../../constants/constants';
import * as checkoutApi from '../../services/checkoutApi';
import { useDepartments } from '../../hooks/useDepartments';
import { useProducts } from '../../hooks/useProducts';
import './ProductList.css';

const ProductList = ({ updateCheckoutCount }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [filtersByDepartment, setFiltersByDepartment] = useState([]);
  const [activeFilter, setActiveFilter] = useState([]);

  const { departments, error: departmentError } = useDepartments();
  const { products, filtersByBrand, error: productError } = useProducts();

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
    }
    if (productError) {
      setError(true);
      setLoading(false);
    }
  }, [products, productError]);

  useEffect(() => {
    if (departments.length > 0) {
      setLoading(false);
      setFiltersByDepartment(departments);
    }

    if (departmentError) {
      setLoading(false);
      setError(true);
      setFiltersByDepartment(FETCH_DEPARTMENT_DATA_ERROR);
    }
  }, [departments, departmentError]);

  useEffect(() => {
    if (error === true) {
      if (
        products === FETCH_PRODUCT_DATA_ERROR &&
        filtersByDepartment === FETCH_DEPARTMENT_DATA_ERROR
      ) {
        setErrMsg(MULTIPLE_ERRORS);
      } else if (products === FETCH_PRODUCT_DATA_ERROR) {
        setErrMsg(FETCH_PRODUCT_DATA_ERROR);
      } else if (filtersByDepartment === FETCH_DEPARTMENT_DATA_ERROR) {
        setErrMsg(FETCH_DEPARTMENT_DATA_ERROR);
      }
    }
  }, [products, filtersByDepartment, error]);

  const addItemToCheckout = async (product) => {
    const productAdded = await checkoutApi.addItemToCheckout(product);
    if (productAdded === PRODUCT_ADDED_TO_CHECKOUT_SUCCESS) {
      updateCheckoutCount();
      toast.success(PRODUCT_ADDED_TO_CHECKOUT_SUCCESS);
    } else {
      toast.error(productAdded);
    }
    setLoading(false);
  };

  const onFilterChange = (filter) => {
    if (activeFilter.includes(filter)) {
      const filterIndex = activeFilter.indexOf(filter);
      const newFilter = [...activeFilter];
      newFilter.splice(filterIndex, 1);
      setActiveFilter(newFilter);
    } else {
      setActiveFilter([...activeFilter, filter]);
    }
  };

  let filteredList;

  if (
    activeFilter.length === 0 ||
    activeFilter.length === filtersByBrand.length + filtersByDepartment.length
  ) {
    filteredList = products;
  } else {
    filteredList = products.filter(
      (item) =>
        activeFilter.includes(item.brand) ||
        activeFilter.includes(item.departmentId)
    );
  }

  return (
    <div className="product-list-container">
      <section className="filter-wrapper">
        <p className="filter-title">Filter by Department</p>
        <div className="filter-data">
          {error ? <p>Cannot load department filters.</p> : null}
          {!error && filtersByDepartment.length
            ? filtersByDepartment.map((filter) => (
                <span key={filter.id} className="filter-item">
                  <label htmlFor={filter.id}>{filter.name}</label>
                  <input
                    className="filter-checkbox"
                    id={filter.id}
                    type="checkbox"
                    checked={activeFilter.includes(filter.id)}
                    onChange={() => onFilterChange(filter.id)}
                  />
                </span>
              ))
            : null}
        </div>
        <p className="filter-title">Filter by Brand</p>
        <div className="filter-data">
          {error ? <p>Cannot load product brand filters.</p> : null}
          {!error && filtersByBrand.length
            ? filtersByBrand.map((filter) => (
                <span key={filter.value} className="filter-item">
                  <label htmlFor={filter.value}>{filter.name}</label>
                  <input
                    className="filter-checkbox"
                    id={filter.value}
                    type="checkbox"
                    checked={activeFilter.includes(filter.value)}
                    onChange={() => onFilterChange(filter.value)}
                  />
                </span>
              ))
            : null}
        </div>
      </section>
      <h1 className="product-list-header">My Products</h1>
      <section className="products-container">
        {error ? (
          <p className="product-list-message">
            {errMsg} Please refresh the page or try again later.
          </p>
        ) : null}
        {loading ? <Loader message="Loading product list..." /> : null}
        <div className="product-list-product-wrapper">
          {!loading && !error && filteredList.length
            ? filteredList.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  addItemToCheckout={addItemToCheckout}
                />
              ))
            : null}
          {!loading && !error && !filteredList.length ? (
            <p className="product-list-message">
              There are no products that match your filters. Please clear some
              filters to see more producs.
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default ProductList;

ProductList.propTypes = {
  updateCheckoutCount: PropTypes.func.isRequired,
};
