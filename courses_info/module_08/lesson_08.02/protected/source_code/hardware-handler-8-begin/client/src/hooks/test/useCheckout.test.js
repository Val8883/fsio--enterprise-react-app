import { renderHook } from '@testing-library/react-hooks';
import { FETCH_CHECKOUT_PRODUCTS_ERROR } from '../../constants/constants';
import * as checkoutApi from '../../services/checkoutApi';
import mockData from '../../__mocksData__/mockDataSet.json';
import { useCheckout } from '../useCheckout';

const renderUseCheckoutHook = async () => {
  const checkoutUpdated = true;
  const { result, waitForNextUpdate } = renderHook(() =>
    useCheckout(checkoutUpdated)
  );
  await waitForNextUpdate();
  return { result, waitForNextUpdate };
};

describe('the useCheckout Hook', () => {
  const mockGetAllCheckoutItems = jest.spyOn(
    checkoutApi,
    'getAllCheckoutItems'
  );

  beforeEach(() => {
    mockGetAllCheckoutItems.mockResolvedValue([
      {
        brand: 'SL',
        departmentId: 56,
        description:
          'This fridge keeps your food at the perfect temperature guaranteed.',
        productId: 3,
        name: 'Stainless Steel Refrigerator',
        retailPrice: 229900,
        quantity: 1,
      },
      {
        brand: 'Swirl Pool',
        departmentId: 56,
        description:
          'Clothes have never been so clean, and a washer has never looked so stylish cleaning them.',
        productId: 4,
        name: 'Matte Black Connected Washing Machine',
        retailPrice: 45050,
        quantity: 1,
      },
    ]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return checkout items and checkout count when there are items in the checkout', async () => {
    const { result } = await renderUseCheckoutHook();
    const { checkoutCount, checkoutItems, error } = result.current;
    expect(checkoutCount).toEqual(mockData.checkoutCount);
    expect(checkoutItems).toStrictEqual(mockData.checkoutItems);
    expect(error).toBeFalsy();
  });

  it('should return an error when the checkout API fails to return data', async () => {
    mockGetAllCheckoutItems.mockResolvedValue(FETCH_CHECKOUT_PRODUCTS_ERROR);

    const { result } = await renderUseCheckoutHook();
    const { checkoutCount, checkoutItems, error } = result.current;
    expect(checkoutCount).toEqual(0);
    expect(checkoutItems).toStrictEqual([]);
    expect(error).toBeTruthy();
  });
});
