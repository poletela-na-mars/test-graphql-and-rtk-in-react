import {gql} from '@apollo/client';

export const GET_BOOK = gql`
  query GetBook($author: String!, $title: String!) {
    getBook(author: $author, title: $title) {
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
