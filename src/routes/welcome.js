const welcomeRouter = require("express").Router();

welcomeRouter.get("/", (req, res) => {
  const resObject = {
    message: "Welcome to test API",
    status: 200,
  };
  res.status(200).json(resObject);
});

module.exports = welcomeRouter;
