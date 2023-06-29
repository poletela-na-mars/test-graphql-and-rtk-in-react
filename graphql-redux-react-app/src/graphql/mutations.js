import { gql } from '@apollo/client';

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $price: Int!, $id: String!) {
    addBook(title: $title, author: $author, price: $price, id: $id) {
     id
     title
     author
     price
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: String!) {
    deleteBook(id: $id) {
     id
    }
  }
`;

export { ADD_BOOK, DELETE_BOOK };
