import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  input CreateBoardInput {
    writer: String
    title: String!
    contents: String 
  }

  type BoardType {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    fetchBoard: BoardType
    fetchBoards: [BoardType]
  }

  type Mutation {
    # createBoard(writer: String, title: String!, contents: String): String
    createBoard(createBoardInput: CreateBoardInput!): String
  }
`;

const resolvers = {
  Query: {
    fetchBoard: (parent, args, context, info) => {
      return {
        number: 1,
        writer: "철수",
        title: "안녕하세요",
        contents: "내용1",
      };
    },
    fetchBoards: (parent, args, context, info) => {
      const result = [
        { number: 1, writer: "철수", title: "안녕하세요", contents: "내용1" },
        { number: 2, writer: "영희", title: "안녕하세요", contents: "내용2" },
        { number: 3, writer: "훈이", title: "안녕하세요", contents: "내용3" },
      ];

      return result;
    },
  },

  Mutation: {
    createBoard: (parent, args, context, info) => {
      console.log(args);
      console.log(args.createBoardInput.writer);

      return "게시물 등록에 성공하였습니다.";
    },
  },
};

const server = new ApolloServer({
  // swagger 부분
  typeDefs,
  // api 부분
  resolvers,
  cors: true,
  // cors: { origin: ["https://naver.com" ]} // 특정 사이트만 지정하고 싶을때
});

startStandaloneServer(server, { listen: { port: 8080 } });
