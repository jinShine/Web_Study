import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Query {
    test: String
  }
`;

const resolvers = {
  Query: {
    test: () => {
      return "HOME";
    },
  },
};

const server = new ApolloServer({
  // swagger 부분
  typeDefs: typeDefs,
  // api 부분
  resolvers,
});

startStandaloneServer(server, { listen: { port: 8080 } });
