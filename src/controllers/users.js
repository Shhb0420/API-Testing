const userModel = require("../models/users");
const form = require("../helpers/form");
const bcrypt = require("bcrypt");

module.exports = {
  updateUser: (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const regexUsername = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

    userModel.getEmailUser(body.email).then((data) => {
      if (!data.length) {
        userModel.getUsernameUser(body.username).then((data) => {
          if (!data.length) {
            if (body.email !== undefined && !regexEmail.test(body.email)) {
              form.error(
                res,
                "Updated data failed",
                "Please Correctly your email",
                403
              );
            } else if (
              body.username !== undefined &&
              !regexUsername.test(body.username)
            ) {
              form.error(
                res,
                "Updated data failed",
                "Please input username and must contain a number",
                403
              );
            } else if (
              body.password !== undefined &&
              !regexPassword.test(body.password)
            ) {
              form.error(
                res,
                "Updated data failed",
                "Please input password must be at least 8 character long and must contain a number",
                403
              );
            } else {
              const saltRounds = 10;
              bcrypt.genSalt(saltRounds, (err, salt) => {
                if (err) {
                  form.error(res, "Update data failed", err, 403);
                }
                bcrypt.hash(body.password, salt, (err, hashedPassword) => {
                  const updateBody = {
                    ...body,
                    password: hashedPassword,
                    updated_at: new Date(Date.now()),
                  };
                  userModel
                    .updateUser(updateBody, id)
                    .then((data) => {
                      if (data.affectedRows === 0) {
                        form.error(
                          res,
                          "Updated data failed",
                          "User ID not found",
                          404
                        );
                      }
                      form.success(
                        res,
                        "Updated data success",
                        { id: data.updateId, ...updateBody },
                        200
                      );
                    })
                    .catch((err) => {
                      form.error(res, "Updated data failed", err, 500);
                    });
                });
              });
            }
          } else {
            form.error(
              res,
              "Updated data failed",
              "Username is already exist",
              403
            );
          }
        });
      } else {
        form.error(res, "Updated data failed", "Email is already exist", 403);
      }
    });
  },

  inputReferral: (req, res) => {
    const { ref_code } = req.body;
    const id = req.decodedToken.id;
    userModel
      .inputReferral(id, ref_code)
      .then(() => {
        // console.log("CNS", data);
        form.success(res, "Input referral success", "1", 200);
      })
      .catch((err) => {
        console.log("CNS", err);
        form.error(res, "Input referral failed", err, 404);
      });
  },

  findUserByName: (req, res) => {
    const { query } = req;
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;

    const { name } = req.query;
    let addQuery = ``;
    let urlQuery = ``;
    let query_length = Object.keys(req.query).length - 1;
    if (query.page) {
      query_length -= 1;
    }
    if (query.limit) {
      query_length -= 1;
    }

    if (Object.keys(req.query).length) {
      addQuery += `WHERE `;
      if (name != null) {
        addQuery += `name like '%${name}%' `;
        urlQuery += `name=${name}`;
      }
    }
    console.log(addQuery, urlQuery, offset, limit);
    userModel
      .totalResult(addQuery)
      .then((data) => {
        userModel
          .findUserByName(
            addQuery,
            urlQuery,
            data[0].total_result,
            page,
            offset,
            limit
          )
          .then((data) => {
            form.success(res, "Search Success", data, 200);
          })
          .catch(() => {
            form.error(res, "Search Failed", `${name} not found`, 404);
          });
      })
      .catch((err) => {
        form.success(res, "Search Failed", err, 500);
      });
  },
};
