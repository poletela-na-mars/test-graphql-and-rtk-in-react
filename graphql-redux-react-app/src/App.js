import React from 'react';
import { ApolloProvider } from '@apollo/client';

import apolloClient from './apolloClient';

import { BooksList } from './components/BooksList';

import './App.css';

const App = () => {
  return (
      <div className='App'>
        <header className='App-header'>
          <h1>Book Shop</h1>
          <p>Test GraphQL in React app</p>
        </header>
        <main>
          <BooksList />
        </main>
      </div>
  );
};

export const AppWrapper = () => {
  return (
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
  );
};
