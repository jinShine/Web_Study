import process from "process";
import { DataSource, DataSourceOptions } from "typeorm";
import { Board } from "./Board.postgres";
import { DB_HOST, DB_PASS, DB_PORT, DB_USER } from "./envInfo";

console.log("반갑습니다.");

const aaa: number = 2;

const options: DataSourceOptions = {
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
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
