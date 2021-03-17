const mainRouter = require("express").Router();

const welcomeRouter = require("./welcome");
const authRouter = require("./auth");
const userRouter = require("./users");

mainRouter.use("/", welcomeRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);

module.exports = mainRouter;
