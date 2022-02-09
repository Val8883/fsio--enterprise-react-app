import { renderHook } from '@testing-library/react-hooks';
import dataSet from '../../__mocksData__/mockDataSet.json';
import * as productApi from '../../services/productApi';
import { FETCH_PRODUCT_DATA_ERROR } from '../../constants/constants';
import { useProducts } from '../useProducts';

const renderUseProductsHook = async () => {
  const { result, waitForNextUpdate } = renderHook(() => useProducts());
  await waitForNextUpdate();
  return { result, waitForNextUpdate };
};

describe('the useProducts Hook', () => {
  const getAllProductsMock = jest.spyOn(productApi, 'getAllProducts');

  beforeEach(() => {
    getAllProductsMock.mockResolvedValue([
      {
        brand: 'Gnome Gardening',
        departmentId: 45,
        description: 'A trowel above all others.',
        id: 1,
        name: 'Polka Dot Trowel',
        retailPrice: 999,
      },
      {
        brand: 'Gnome Gardening',
        departmentId: 45,
        description:
          'Protect yourself from sun burn while gardening with a wide brimmed, lightweight sun hat.',
        id: 2,
        name: 'Rose Sun Hat',
        retailPrice: 2495,
      },
      {
        brand: 'SL',
        departmentId: 56,
        description:
          'This fridge keeps your food at the perfect temperature guaranteed.',
        id: 3,
        name: 'Stainless Steel Refrigerator',
        retailPrice: 229900,
      },
      {
        brand: 'Swirl Pool',
        departmentId: 56,
        description:
          'Clothes have never been so clean, and a washer has never looked so stylish cleaning them.',
        id: 4,
        name: 'Matte Black Connected Washing Machine',
        retailPrice: 45050,
      },
    ]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return a list of of products and filters by brand when the product API returns info', async () => {
    const { result } = await renderUseProductsHook();
    const { products, filtersByBrand, error } = result.current;
    expect(products.length).toEqual(dataSet.products.length);
    expect(filtersByBrand.length).toEqual(dataSet.filtersByBrand.length);
    expect(products).toStrictEqual(dataSet.products);
    expect(filtersByBrand).toStrictEqual(dataSet.filtersByBrand);
    expect(error).not.toBeTruthy();
  });

  it('should return an error if the product API fails to return data', async () => {
    getAllProductsMock.mockResolvedValue(FETCH_PRODUCT_DATA_ERROR);

    const { result } = await renderUseProductsHook();
    const { products, filtersByBrand, error } = result.current;
    expect(products).toEqual(FETCH_PRODUCT_DATA_ERROR);
    expect(filtersByBrand).toEqual([]);
    expect(error).toBeTruthy();
  });
});
