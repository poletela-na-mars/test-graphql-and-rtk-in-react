import {gql} from '@apollo/client';

export const FILTER_BOOKS = gql`
  query FilterBooks($author: String, $title: String) {
    filterBooks(author: $author, title: $title) {
      id
      author
      title
      price
    }
  }
`;

export const GET_BOOKS = gql`
  query GetBooks {
    getBooks {
       id
       author
       title
       price
    }
  }
`;
