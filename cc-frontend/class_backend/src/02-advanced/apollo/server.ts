import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/dist/esm/standalone";
import { resolvers, typeDefs } from "./api";

export const serverStart = async () => {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀 Server ready at ${url}`);
};
