import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { GET_BOOKS } from '../graphql/queries';
import { AppWrapper } from '../App';

const mocks = [
  {
    request: {
      query: GET_BOOKS,
    },
    result: {
      data: {
        getBooks: [
          {
            id: '0',
            title: 'The Awakening',
            author: 'Kate Chopin',
            price: 399,
          },
          {
            id: '1',
            title: 'City of Glass',
            author: 'Paul Auster',
            price: 499,
          },
        ],
      },
    },
  },
];

test('renders users list with mocked data', async () => {
  render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AppWrapper />
      </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Kate Chopin')).toBeInTheDocument();
  });
});
