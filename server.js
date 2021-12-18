const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

const appRouter = require("./src/routes/app");
app.set("view engine", "ejs");

app.use(appRouter);

app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
  console.log("server is up");
});
