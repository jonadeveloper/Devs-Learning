import express from "express";
const bodyParser = require("body-parser");
const coursesRoute = require("./routes/courses");
const categoriesRoute = require("./routes/categories");
const usersRoute = require("./routes/users");
const meliRoute = require("./routes/meli");

const server = express();

server.use(bodyParser.json());
server.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
server.use("/courses", coursesRoute);
server.use("/categories", categoriesRoute);
server.use("/pay", meliRoute);
server.use("/", usersRoute);

server.use((err: any, _req: any, res: any, _next: any) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
