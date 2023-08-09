// import { DataSource, DataSourceOptions } from "typeorm";
// import { Board } from "./Board.postgres";
// import { DB_HOST, DB_PASS, DB_PORT, DB_USER } from "./envInfo";

// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";

// // DOCS
// // The GraphQL schema
// const typeDefs = `#graphql

//   # 인자로 들어가는 타입은 input으로 만들어줘야 한다!
//   input CreateBoardInput {
//     writer: String,
//     title: String,
//     contents: String
//   }

//   type MyBoard {
//     number: Int
//     writer: String
//     title: String
//     contents: String
//   }

//   type Query {
//     fetchBoards: [MyBoard]
//   }

//   type Mutation {
//     # 연습용
//     # createBoard(writer: String, title: String, contents: String): String

//     createBoard(createBoardInput: CreateBoardInput!): String
//     updateBoard: String
//     deleteBoard: String
//   }
// `;

// // API
// // A map of functions which return data for the schema.
// const resolvers = {
//   Query: {
//     fetchBoards: async (parent: any, args: any, context: any, info: any) => {
//       const result = await Board.find(); // 모두 꺼내기
//       // Board.findOne({ where: { number: 3 } }); // 한개만 꺼내기 (조건이 필요)
//       return result;
//     },
//   },

//   Mutation: {
//     createBoard: async (parent: any, args: any, context: any, info: any) => {
//       await Board.insert({
//         ...args.createBoardInput,
//         // writer: args.createBoardInput.writer,
//         // title: args.createBoardInput.title,
//         // contents: args.createBoardInput.contents,
//       });
//       return "게시글 등록에 성공하였습니다.";
//     },

//     updateBoard: async () => {
//       // ({조건}, {변경})
//       await Board.update({ number: 3 }, { writer: "버즈" });

//       return "게시글 수정에 성공하였습니다.";
//     },

//     deleteBoard: async () => {
//       await Board.delete({ number: 3 }); // 3번 게시글을 삭제해줘

//       // 현업에서는 실제로 바로 삭제하지 않고, isDeleted라는 컬럼을 통해서 true이면 삭제되었다고
//       // 가정한다. 유효기간을 준다
//       // await Board.update({ number: 3 }, { isDeleted: true });
//       // await Board.update({ number: 3 }, { deletedAt: new Date() }); // 이건 원래 null인데 시간이 있으면 삭제되었다고 가정

//       return "게시글이 삭제에 성공하였습니다.";
//     },
//   },
// };

// const options: DataSourceOptions = {
//   type: "postgres",
//   host: DB_HOST,
//   port: DB_PORT,
//   username: DB_USER,
//   password: DB_PASS,
//   database: "postgres",
//   synchronize: true,
//   logging: true,
//   entities: [Board],
// };

// const AppDataSource = new DataSource(options);

// // AppDataSource.initialize()
// //   .then(() => {
// //     console.log("DB접속에 성공했습니다!!");
// //     start();
// //   })
// //   .catch((error) => {
// //     console.log("DB접속에 실패했습니다.");
// //     console.log("원인: ");
// //     console.log(error);
// //   });

// // const start = async () => {
// //   const server = new ApolloServer({
// //     typeDefs,
// //     resolvers,
// //   });

// //   const { url } = await startStandaloneServer(server, {
// //     listen: { port: 4000 },
// //   });
// //   console.log(`🚀 Server ready at ${url}`);
// // };

// type Success = () => void;
// export function DBStart(success: Success) {
//   AppDataSource.initialize()
//     .then(success)
//     .catch((error) => {
//       console.log("DB접속에 실패했습니다.");
//       console.log("원인: ");
//       console.log(error);
//     });
// }

// DBStart(() => {
//   console.log("###################### 성공");
// });
