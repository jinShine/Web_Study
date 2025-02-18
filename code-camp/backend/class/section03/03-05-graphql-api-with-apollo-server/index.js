import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Board {
    id: Int
    title: String
  }

  type Query {
    boards: [Board]
  }
`;

const resolvers = {
  Query: {
    boards: () => {
      return [
        {
          id: 1,
          title: "게시글1",
        },
        {
          id: 2,
          title: "게시글2",
        },
      ];
    },
  },
};

// Apollo Server 생성시
// REST와 달리 Swagger, API를 같이 생성한다.
// 1.typeDefs: 스키마 정의
// 2.resolvers: 실제 로직 구현
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log(`🚀 Server ready at ${url}`);
