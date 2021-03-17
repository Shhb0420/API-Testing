const jwt = require("jsonwebtoken");
const form = require("../form");

module.exports = (req, res, next) => {
  const bearerToken = req.header("x-access-token");
  if (!bearerToken) {
    form.error(res, "Please Login First", "err", 401);
  } else {
    const token = bearerToken.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      req.decodedToken = decodedToken;
      next();
    } catch (err) {
      form.error(res, "Invalid Token", err, 401);
    }
  }
};
