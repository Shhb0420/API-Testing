require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const mainRouter = require("./src/routes/index");
const app = express();
const { PORT } = process.env;

app.use(express.static("public"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

module.exports = app;
