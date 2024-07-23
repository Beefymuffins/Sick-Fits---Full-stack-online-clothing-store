import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Product from '../components/Product';
import { fakeItem } from '../lib/testUtils';

// use the fake item so we don't have to interact with the database
const product = fakeItem();

// Check the whole component
describe('<Product/>', () => {
  it('renders out the price tag and title', () => {
    // container is the component
    const { container, debug } = render(
      // MockProvider simulates Apollo. (mocks like how it is in _app.js) so we don't have to interact with the database
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    const priceTag = screen.getByText('$50');
    debug(priceTag);
    expect(priceTag).toBeInTheDocument();
    const link = container.querySelector('a');
    debug(link);
    expect(link).toHaveAttribute('href', '/product/abc123');
    expect(link).toHaveTextContent(product.name);
  });

  // Snapshot Match
  it('Renders and matched the snapshot', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  // GetByAltText
  it('renders the image properly', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    // grab the image
    const img = screen.getByAltText(product.name);
    expect(img).toBeInTheDocument();
  });
});
