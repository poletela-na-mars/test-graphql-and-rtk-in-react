import { gql } from '@apollo/client';

const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $author: String!, $price: Int!, $id: String!) {
    createBook(title: $title, author: $author, price: $price, id: $id) {
     id
     title
     author
     price
    }
  }
`;
export { CREATE_BOOK };