const authModel = require("../models/auth");
const form = require("../helpers/form");

module.exports = {
  registerUser: (req, res) => {
    const { body } = req;
    authModel
      .registerUser(body)
      .then((data) => {
        form.success(res, "Registered Success", data, 200);
      })
      .catch((err) => {
        form.error(res, "Registered Failed", err, 403);
      });
  },

  loginUser: (req, res) => {
    const { body } = req;
    authModel
      .loginUser(body)
      .then((data) => {
        form.success(res, "Login Success", data, 200);
      })
      .catch((err) => {
        form.error(res, "Login Failed", err, 400);
      });
  },
};
