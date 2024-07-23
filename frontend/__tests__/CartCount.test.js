import { render } from '@testing-library/react';
import wait from 'waait';
import CartCount from '../components/CartCount';

describe('<CartCount/>', () => {
  it('Renders', () => {
    render(<CartCount count={10} />);
  });
  it('Matches snapshot', () => {
    const { container } = render(<CartCount count={11} />);
    expect(container).toMatchSnapshot();
  });
  it('updates via props', async () => {
    const { container, rerender, debug } = render(<CartCount count={11} />);
    expect(container.textContent).toBe('11');
    // Update the props
    rerender(<CartCount count="12" />);
    // Wait for the new updated cart number. (CSS transitions the old number out and new one in, short period of time they are both there.
    // Breaks the test, so we wait till new number is there.)
    await wait(400);

    expect(container.textContent).toBe('12');
    debug();
    expect(container).toMatchSnapshot();
  });
});
