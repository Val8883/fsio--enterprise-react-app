import { useState, useEffect } from 'react';
import { FETCH_PRODUCT_DATA_ERROR } from '../constants/constants';
import { formatFilters } from '../helpers/formatFilters';
import * as productApi from '../services/productApi';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [filtersByBrand, setFiltersByBrand] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await productApi.getAllProducts();
      if (allProducts === FETCH_PRODUCT_DATA_ERROR) {
        setError(true);
        setProducts(allProducts);
      } else {
        setProducts(allProducts);

        const allFiltersByBrand = formatFilters(allProducts, 'brand').sort(
          (a, b) => {
            const nameA = a.label.toUpperCase();
            const nameB = b.label.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          }
        );
        setFiltersByBrand(allFiltersByBrand);
      }
    };

    fetchProducts();
  }, []);

  return {
    products,
    filtersByBrand,
    error,
  };
};

export { useProducts };
