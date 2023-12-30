import express from "express";

import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config";

const app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3002, () => {
  console.log("Example app listening on port 3002!");
});
