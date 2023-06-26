import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import apolloClient from './apolloClient';
import store from './redux/store';

import { UsersList } from './components/UsersList';

import './App.css';

const App = () => {
  return (
      <div className='App'>
        <header className='App-header'>
          <h1>Test GraphQL and Redux Toolkit in React app</h1>
        </header>
        <main>
          <UsersList />
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
