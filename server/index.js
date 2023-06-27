import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// export const typeDefs = `
// type User {
//   id: ID!
//       name: String!
//       posts: [Post!]!
//       comments: [Comment!]!
// }
//
// type Post {
//   id: ID!
//       title: String!
//       author: User!
//       comments: [Comment!]!
// }
//
// type Comment {
//   id: ID!
//       content: String!
//       postId: ID!
//       author: User!
// }
//
// type Query {
//   getUsers(): [User!]!
//   getPost(id: ID!): Post
//   getComment(id: ID!): Comment
// }
//
// type Mutation {
//   createUser(name: String!): User!
//       createPost(title: String!, authorId: ID!): Post!
//       createComment(content: String!, postId: ID!, authorId: ID!): Comment!
// }
// `;

export const typeDefs = `
 type Book {
    id: ID
    title: String
    author: String
    price: Int
  }
  
  type Query {
    getBooks: [Book]
    filterBooks(author: String, title: String): [Book]
  }
`;

const data = [
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
];

// TODO - remove getBooks

const resolvers = {
  Query: {
    getBooks: () => data,
    filterBooks: (_, args) => {
      if (!args.author && !args.title) return data;
      return data.filter((book) => args.author === book.author || args.title === book.title);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);

// TODO - delete express, cors
