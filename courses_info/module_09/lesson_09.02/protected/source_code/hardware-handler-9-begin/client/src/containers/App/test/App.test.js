import { render, screen } from '@testing-library/react';
import * as useCheckout from '../../../hooks/useCheckout';
import App from '../App';

describe('Hardware handler app', () => {
  it('should render app without crashing', () => {
    render(<App />);
    const title = screen.getByText(/welcome to hardware handler/i);
    const productButton = screen.getAllByText(/my products/i);
    const newProductButton = screen.getAllByText(/add new products/i);
    const checkoutButton = screen.getAllByText(/checkout/i);
    expect(title).toBeInTheDocument();
    expect(productButton).toHaveLength(2);
    expect(newProductButton).toHaveLength(2);
    expect(checkoutButton).toHaveLength(2);
  });

  it('should display checkout count in nav bar when there are items in checkout', () => {
    const mockUseCheckout = jest.spyOn(useCheckout, 'useCheckout');

    mockUseCheckout.mockReturnValue({
      checkoutCount: 1,
      checkoutItems: [
        {
          brand: 'Test Brand',
          departmentId: 1,
          description: 'My test description',
          id: 1,
          name: 'A test name',
          productId: 1,
          quantity: 1,
          retailPrice: 1234,
        },
      ],
      setCheckoutItems: jest.fn(),
      error: false,
    });

    render(<App />);
    const checkoutCount = screen.getByText(/1/i);
    expect(checkoutCount).toBeInTheDocument();
  });
});
