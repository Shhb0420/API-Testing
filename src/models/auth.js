const db = require("../config/mySQL");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const referralCode = require("referral-code-generator");

module.exports = {
  registerUser: (body) => {
    return new Promise((resolve, reject) => {
      const { email, username, name, password } = body;
      const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/i;
      const regexUsername = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/i;
      const queryCheckEmail = "SELECT email FROM users WHERE email=?";
      const queryCheckUsername = "SELECT username FROM users WHERE username=?";
      db.query(queryCheckEmail, email, (err, data) => {
        if (!data[0]) {
          db.query(queryCheckUsername, username, (err, data) => {
            if (!data[0]) {
              if (!regexEmail.test(email)) {
                reject("Please correctly your email!!");
              } else if (!regexPassword.test(password)) {
                reject(
                  "Please input password must be at least 8 character long and must contain a number"
                );
              } else if (!regexUsername.test(username)) {
                reject("Please input username and must contain a number");
              } else if (
                email === "" ||
                username === "" ||
                name === "" ||
                password === ""
              ) {
                reject("Please input all your data");
              } else {
                const saltRounds = 10;
                bcrypt.genSalt(saltRounds, (err, salt) => {
                  if (err) {
                    reject(err);
                  }
                  bcrypt.hash(body.password, salt, (err, hashedPassword) => {
                    if (err) {
                      reject(err);
                    }
                    const referral = referralCode.alphaNumeric(
                      "uppercase",
                      2,
                      2
                    );
                    const newBody = {
                      ...body,
                      password: hashedPassword,
                      referral_code: referral,
                    };
                    const queryString = "INSERT INTO users SET ?";
                    db.query(queryString, newBody, (err, data) => {
                      if (!err) {
                        resolve({ name: body.name, email: body.email });
                      } else {
                        reject(err);
                      }
                    });
                  });
                });
              }
            } else {
              reject("Username is already exist");
            }
          });
        } else {
          reject("Email is already exist");
        }
      });
    });
  },

  loginUser: (body) => {
    return new Promise((resolve, reject) => {
      const { email, password } = body;
      const queryString =
        "SELECT id, username, password, name FROM users WHERE email = ?";
      db.query(queryString, email, (err, data) => {
        if (!err) {
          if (data[0]) {
            bcrypt.compare(password, data[0].password, (err, result) => {
              if (!err) {
                if (!result) {
                  reject("Wrong Password");
                } else {
                  const payload = {
                    id: data[0].id,
                    name: data[0].name,
                  };
                  const token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: "1d",
                  });
                  resolve({
                    id_user: data[0].id,
                    username: data[0].username,
                    name: data[0].name,
                    email: email,
                    tokenId: token,
                  });
                  console.log(resolve);
                }
              } else {
                reject("Hash Error");
              }
            });
          } else {
            reject("User Not Found!");
          }
        } else {
          reject("Error Occured");
        }
      });
    });
  },
};
