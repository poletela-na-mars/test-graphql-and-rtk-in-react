import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { GET_USER } from '../graphql/queries';
import { AppWrapper } from '../App';

const mocks = [
  {
    request: {
      query: GET_USER,
    },
    result: {
      data: {
        users: [
          { id: 1, name: 'Alice' },
          // { id: 2, name: 'Bob' },
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
    expect(screen.getByText('Alice')).toBeInTheDocument();
    // expect(screen.getByText('Bob')).toBeInTheDocument();
  });
});
