import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Board {
    id: Int
    title: String
    writer: String
  }

  input CreateBoardInput {
    title: String, writer: String
  }

  type Query {
    fethBoards: [Board]
  }

  type Mutation {
    createBoard(createBoardInput: CreateBoardInput!): String
  }
`;

const resolvers = {
  Query: {
    fethBoards: (parent, args, context, info) => {
      console.log(parent);
      console.log(args);
      console.log(context);
      console.log(info);
      return [
        {
          id: 1,
          title: "게시글1",
          writer: "철수",
        },
        {
          id: 2,
          title: "게시글2",
          writer: "영희",
        },
      ];
    },
  },
  Mutation: {
    createBoard: (_, args) => {
      console.log(args.createBoardInput.title);
      return "게시글 등록에 성공했습니다.";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log(`🚀 Server ready at ${url}`);
