import { useEffect, useState, useContext } from 'react';
import { notification, Checkbox } from 'antd';
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
import CheckoutItemContext from '../../context/CheckoutItemContext';
import ProductFunctionContext from '../../context/ProductFunctionContext';
import './ProductList.css';

const ProductList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [filtersByDepartment, setFiltersByDepartment] = useState([]);
  const [activeBrandFilter, setActiveBrandFilter] = useState([]);
  const [activeDeptFilter, setActiveDeptFilter] = useState([]);

  const { departments, error: departmentError } = useDepartments();
  const { products, filtersByBrand, error: productError } = useProducts();
  const checkoutItemContext = useContext(CheckoutItemContext);

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
      const deptFilters = departments.map((dept) => {
        let newObj = {};
        newObj = {
          label: dept.name,
          value: dept.id,
        };
        return newObj;
      });
      setLoading(false);
      setFiltersByDepartment(deptFilters);
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
      checkoutItemContext.updateCheckoutCount();
      notification.success({
        description: PRODUCT_ADDED_TO_CHECKOUT_SUCCESS,
        closeIcon: <div />,
      });
    } else {
      notification.error({
        description: productAdded,
        closeIcon: <div />,
      });
    }
    setLoading(false);
  };

  const onDeptFilterChange = (filter) => {
    setActiveDeptFilter(filter);
  };

  const onBrandFilterChange = (filter) => {
    setActiveBrandFilter(filter);
  };

  let filteredList;

  if (
    activeBrandFilter.length + activeDeptFilter.length === 0 ||
    activeBrandFilter.length + activeDeptFilter.length ===
      filtersByBrand.length + filtersByDepartment.length
  ) {
    filteredList = products;
  } else {
    filteredList = products.filter(
      (item) =>
        activeBrandFilter.includes(item.brand) ||
        activeDeptFilter.includes(item.departmentId)
    );
  }

  return (
    <div className="product-list-container">
      <section className="filter-wrapper">
        <p className="filter-title">Filter by Department</p>
        <div className="filter-data">
          {error ? <p>Cannot load department filters.</p> : null}
          {!error && filtersByDepartment.length ? (
            <Checkbox.Group
              options={filtersByDepartment}
              onChange={onDeptFilterChange}
              className="filter-item"
            />
          ) : null}
        </div>
        <p className="filter-title">Filter by Brand</p>
        <div className="filter-data">
          {error ? <p>Cannot load product brand filters.</p> : null}
          {!error && filtersByBrand.length ? (
            <Checkbox.Group
              options={filtersByBrand}
              onChange={onBrandFilterChange}
              className="filter-item"
            />
          ) : null}
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
        <ProductFunctionContext.Provider value={{ addItemToCheckout }}>
          <div className="product-list-product-wrapper">
            {!loading && !error && filteredList.length
              ? filteredList.map((product) => (
                  <Product key={product.id} product={product} />
                ))
              : null}
            {!loading && !error && !filteredList.length ? (
              <p className="product-list-message">
                There are no products that match your filters. Please clear some
                filters to see more producs.
              </p>
            ) : null}
          </div>
        </ProductFunctionContext.Provider>
      </section>
    </div>
  );
};

export default ProductList;
