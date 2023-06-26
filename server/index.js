import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

export const typeDefs = `type User {
  id: ID!
      name: String!
      posts: [Post!]!
      comments: [Comment!]!
}

type Post {
  id: ID!
      title: String!
      author: User!
      comments: [Comment!]!
}

type Comment {
  id: ID!
      content: String!
      postId: ID!
      author: User!
}

type Query {
  getUsers(): [User!]!
  getPost(id: ID!): Post
  getComment(id: ID!): Comment
}

type Mutation {
  createUser(name: String!): User!
      createPost(title: String!, authorId: ID!): Post!
      createComment(content: String!, postId: ID!, authorId: ID!): Comment!
}
`;

const data = {
  users: { id: 1, name: 'John Doe', posts: [], comments: [] },
  posts: { id: 101, title: 'Integrating GraphQL and Redux Toolkit', authorId: 1 },
  comments: { id: 1001, content: 'Great post!', postId: 101, authorId: 1 }
};

const resolvers = {
  Query: {
    getUsers: () => data.users,
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
// TODO - add resolvers
