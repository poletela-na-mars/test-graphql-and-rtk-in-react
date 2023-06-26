import { render, screen } from '@testing-library/react';
import { AppWrapper } from '../App';

test('renders the UsersList component', () => {
  render(<AppWrapper />);
  expect(screen.getByText('Loading')).toBeInTheDocument();
});
