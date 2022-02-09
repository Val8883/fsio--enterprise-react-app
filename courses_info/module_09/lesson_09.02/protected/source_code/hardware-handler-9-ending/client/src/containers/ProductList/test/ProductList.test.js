import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import * as checkoutApi from '../../../services/checkoutApi';
import * as useDepartments from '../../../hooks/useDepartments';
import * as useProducts from '../../../hooks/useProducts';
import {
  FETCH_DEPARTMENT_DATA_ERROR,
  PRODUCT_ADDED_TO_CHECKOUT_SUCCESS,
} from '../../../constants/constants';
import dataSet from '../../../__mocksData__/mockDataSet.json';
import ProductList from '../ProductList';

describe('Product List component', () => {
  const mockUseDepartments = jest.spyOn(useDepartments, 'useDepartments');
  const mockUseProducts = jest.spyOn(useProducts, 'useProducts');

  beforeEach(() => {
    mockUseDepartments.mockReturnValue({
      departments: dataSet.departments,
      error: dataSet.error,
    });
    mockUseProducts.mockReturnValue({
      products: dataSet.products,
      filtersByBrand: dataSet.filtersByBrand,
      error: dataSet.error,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the component without crashing', () => {
    render(<ProductList />);
    const pageTitle = screen.getByText(/my products/i);
    const deptFilter = screen.getByText(/filter by department/i);
    const brandFilter = screen.getByText(/filter by brand/i);
    expect(pageTitle).toBeInTheDocument();
    expect(deptFilter).toBeInTheDocument();
    expect(brandFilter).toBeInTheDocument();
  });

  describe('products on the page', () => {
    it('should render products when useProducts Hook returns data', () => {
      render(<ProductList />);
      const products = screen.getAllByText(/description/i);
      expect(products).toHaveLength(4);
      expect(screen.getByText(/matte black/i)).toBeInTheDocument();
      expect(screen.getByText(/rose sun hat/i)).toBeInTheDocument();
      expect(screen.getByText(/9.99/i)).toBeInTheDocument();
    });

    it('should show an error message when there is a problem fetching data from either Hook', async () => {
      mockUseDepartments.mockReturnValueOnce({
        error: true,
        departments: [],
      });

      render(<ProductList />);
      const errorMsg = await screen.findByText(
        `${FETCH_DEPARTMENT_DATA_ERROR} Please refresh the page or try again later.`
      );
      expect(errorMsg).toBeInTheDocument();
    });

    it('should successfully add a product to the checkout when the Add to Checkout button is clicked', async () => {
      const mockAddItemToCheckout = jest.spyOn(
        checkoutApi,
        'addItemToCheckout'
      );

      mockAddItemToCheckout.mockReturnValue(PRODUCT_ADDED_TO_CHECKOUT_SUCCESS);

      render(<ProductList />);
      const addBtn = screen.getAllByText(/add to checkout/i)[0];
      await act(async () => {
        await fireEvent.click(addBtn);
      });
      expect(mockAddItemToCheckout).toHaveBeenCalledWith(dataSet.products[0]);
    });
  });

  describe('product filters', () => {
    it('should render filter options when useProducts Hook and useDepartments Hook return data', async () => {
      render(<ProductList />);
      // wait for both hooks to return data
      await screen.findByText(/appliances/i);
      const filters = document.getElementsByClassName('filter-item');
      const filterDeptCount = document.getElementsByClassName('filter-data')[0]
        .children;
      const filterBrandCount = document.getElementsByClassName('filter-data')[1]
        .children;
      expect(filters).toHaveLength(5);
      expect(filterDeptCount).toHaveLength(2);
      expect(filterBrandCount).toHaveLength(3);
    });

    it('should render error messages when either Hook returns errors', async () => {
      mockUseDepartments.mockReturnValueOnce({
        error: true,
        departments: [],
      });

      mockUseProducts.mockReturnValueOnce({
        error: true,
        filtersByBrand: [],
        products: [],
      });

      render(<ProductList />);
      expect(await screen.findByText(/Cannot load department filters./i));
      expect(await screen.findByText(/Cannot load product brand filters./i));
    });

    it('should filter products displayed on page when filters are checked and unchecked', async () => {
      render(<ProductList />);
      const checkboxes = screen.getAllByRole('checkbox');
      expect(await screen.findAllByText(/description/i)).toHaveLength(4);
      userEvent.click(checkboxes[0]);
      expect(await screen.findAllByText(/description/i)).toHaveLength(2);
      userEvent.click(checkboxes[0]);
      expect(await screen.findAllByText(/description/i)).toHaveLength(4);
    });
  });
});
