import { DataSource, DataSourceOptions } from "typeorm";
import { DB_HOST, DB_PORT, DB_USER, DB_PASS } from "../../../envInfo";

type Success = () => void;

const options: DataSourceOptions = {
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: [],
};

const AppDataSource = new DataSource(options);

export default function DBStart(success: Success) {
  AppDataSource.initialize()
    .then(success)
    .catch((error) => {
      console.log("DB접속에 실패했습니다.");
      console.log("원인: ");
      console.log(error);
    });
}
