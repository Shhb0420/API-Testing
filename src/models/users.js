const db = require("../config/mySQL");
const bcrypt = require("bcrypt");

module.exports = {
  updateUser: (id, updateBody) => {
    return new Promise((resolve, reject) => {
      const qs = "UPDATE users SET ? WHERE id = ?";
      db.query(qs, [id, updateBody], (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  getEmailUser: (email) => {
    return new Promise((resolve, reject) => {
      const qs = `SELECT email FROM users WHERE email='${email}'`;
      db.query(qs, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  getUsernameUser: (username) => {
    return new Promise((resolve, reject) => {
      const qs = `SELECT username FROM users WHERE username='${username}'`;
      db.query(qs, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  inputReferral: (id, ref_code) => {
    return new Promise((resolve, reject) => {
      const body = {
        id: id,
        ref_code: ref_code,
      };
      const qs = "INSERT INTO users (ref_code) VALUES ?";
      db.query(qs, body, (err, data) => {
        if (!err) {
          console.log("data", data);
          resolve(data);
        } else {
          console.log("err", err);
          reject(err);
        }
      });
    });
  },

  findUserByName: (addQuery, urlQuery, total_result, page, offset, limit) => {
    return new Promise((resolve, reject) => {
      const queryString =
        `SELECT id, name from users ` +
        addQuery +
        `LIMIT ${limit} OFFSET ${offset}`;
      db.query(queryString, (err, data) => {
        if (data.length !== 0) {
          newData = {
            users: data,
            pageInfo: {
              result: total_result,
              totalPage:
                total_result % limit === 0
                  ? total_result / limit
                  : Math.floor(total_result / limit) + 1,
              currentPage: page || 1,
              previousPage:
                page === 1
                  ? null
                  : `/search?${urlQuery}&page=${page}&limit=${limit}`,
              nextPage:
                total_result - (offset + limit) < 0
                  ? null
                  : `/search?${urlQuery}&page=${page + 1}&limit=${limit}`,
            },
          };
          console.log(data.length);
          resolve(newData);
        } else {
          reject(err);
        }
      });
    });
  },
  totalResult: (addQuery) => {
    return new Promise((resolve, reject) => {
      const qs = `SELECT count(name) as total_result FROM users ` + addQuery;
      db.query(qs, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
};
