import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  ADD_NEW_PRODUCT_ERROR,
  ADD_NEW_PRODUCT_SUCCESS,
  FETCH_PRODUCT_DATA_ERROR,
} from '../../constants/constants';
import mockData from '../../__mocksData__/mockDataSet.json';
import * as productApi from '../productApi';

describe('testing product API service', () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  it('should return all products when getAllProducts is called', async () => {
    const mockAllProducts = mockData.products;
    mock.onGet('/products').reply(200, mockAllProducts);
    const actualAllProducts = await productApi.getAllProducts();
    expect(actualAllProducts).toEqual(mockAllProducts);
  });

  it('should return an error message when the getAllProducts call fails', async () => {
    const mockErrMsg = FETCH_PRODUCT_DATA_ERROR;
    mock.onGet('/products').reply(500, mockErrMsg);
    const actualErrMsg = await productApi.getAllProducts();
    expect(actualErrMsg).toEqual(mockErrMsg);
  });

  it('should add a new product to the list of products with valid data entered', async () => {
    const mockNewProductData = {
      brand: 'Wakita',
      department: 56,
      description: 'The microwave you grew up with, but better.',
      name: 'Class Microwave',
      retailPrice: 12900,
    };

    mock
      .onPost('/products/', mockNewProductData)
      .reply(200, ADD_NEW_PRODUCT_SUCCESS);
    const actualResult = await productApi.addNewProduct(mockNewProductData);
    expect(actualResult).toEqual(ADD_NEW_PRODUCT_SUCCESS);
  });

  it('should return an error message if a product fails to be added to the database', async () => {
    mock.onPost('/products/', {}).reply(500, ADD_NEW_PRODUCT_ERROR);
    const actualErrMsg = await productApi.addNewProduct({});
    expect(actualErrMsg).toEqual(ADD_NEW_PRODUCT_ERROR);
  });
});
