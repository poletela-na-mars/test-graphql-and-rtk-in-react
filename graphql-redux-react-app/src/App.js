import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import apolloClient from './apolloClient';
import store from './redux/store';

import { BooksList } from './components/BooksList';

import './App.css';

const App = () => {
  return (
      <div className='App'>
        <header className='App-header'>
          <h1>Library</h1>
          <p>Test GraphQL and Redux Toolkit in React app</p>
        </header>
        <main>
          <BooksList />
        </main>
      </div>
  );
};

export const AppWrapper = () => {
  return (
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      </Provider>
  );
};

// export const AppWithProvider = () => {
//   return (
//       <Provider store={store}>
//           <App />
//       </Provider>
//   );
// };
