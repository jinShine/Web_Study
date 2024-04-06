// import { serverStart } from "./src/02-advanced/apollo/server";
// import { DBStart } from "./src/02-advanced/postres/AppDataSource";

import { serverStart } from "./src/02-advanced/apollo/server";
import DBStart from "./src/02-advanced/postres/AppDataSource";

DBStart(() => {
  serverStart();
});
