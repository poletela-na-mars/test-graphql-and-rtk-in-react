import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

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
  
  type Mutation {
    addBook(title: String!, author: String!, price: Int!, id: String!): Book 
    deleteBook(id: String!): Book
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


const resolvers = {
  Query: {
    getBooks: () => data,
    // filterBooks: (_, args) => {
    //   if (!args.author && !args.title) return data;
    //   return data.filter((book) => {
    //     return ((args.author ? book.author.toLowerCase().trim().indexOf(args.author) >= 0 : true) &&
    //         (args.title ? book.title.toLowerCase().trim().indexOf(args.title) >= 0 : true));
    //   });
    // },
  },
  Mutation: {
    addBook: (_, args) => data.push(args),
    deleteBook: (_, args) => {
      const indexOfObject = data.findIndex((book) => book.id === args.id);
      data.splice(indexOfObject, 1);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);
