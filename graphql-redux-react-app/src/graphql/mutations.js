import { gql } from '@apollo/client';

const CREATE_USER = gql` 
  mutation CreateUser($name: String!) {
    createUser(name: $name) {
       id
      name
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $authorId: ID!) {
    createPost(title: $title, authorId: $authorId) {
     id
     title
      author {
        id
        name
      }
    }
  }
`;
export {CREATE_USER, CREATE_POST};