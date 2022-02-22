const { ApolloServer, gql } = require('apollo-server');
const { default: axios } = require('axios');

const users = [
  { id: '1', name: 'John Doe', email: 'john@test.com' },
  { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
];

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    hello(name: String!): String
    users: [User]
    user(id: ID!): User
  }
`


const resolvers = {
  Query: {
    hello: (parent, args) => `Hello ${args.name}`,
    users: async () => {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      return response.data;
    }, 
    user: async (parent, args) => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${args.id}`
      );
      return response.data;
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})