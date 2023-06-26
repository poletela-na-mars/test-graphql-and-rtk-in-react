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
  getUser(id: ID!): User
  getPost(id: ID!): Post
  getComment(id: ID!): Comment
}

type Mutation {
  createUser(name: String!): User!
      createPost(title: String!, authorId: ID!): Post!
      createComment(content: String!, postId: ID!, authorId: ID!): Comment!
}
`;
