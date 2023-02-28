import { DataSource, DataSourceOptions } from "typeorm";
import { Board } from "./Board.postgres";

console.log("반갑습니다.");

const aaa: number = 2;

const options: DataSourceOptions = {
  type: "postgres",
  host: "34.22.64.245",
  port: 5002,
  username: "postgres",
  password: "postgres2022",
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: [Board],
};

const AppDataSource = new DataSource(options);

AppDataSource.initialize()
  .then(() => {
    console.log("DB접속에 성공했습니다!!");
  })
  .catch((error) => {
    console.log("DB접속에 실패했습니다.");
    console.log("원인: ");
    console.log(error);
  });
