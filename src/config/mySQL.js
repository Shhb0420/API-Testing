const mySQL = require("mysql");

const { HOST, DB, DB_USER, DB_PASSWORD } = process.env;

// console.log(HOST);
// console.log(DB);
// console.log(user);
// console.log(password);

// koneksi ke db
const db = mySQL.createConnection({
  host: HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB,
  multipleStatements: true,
});

// cek koneksi ke db
db.connect((err) => {
  if (err) throw err;
  console.log("success connect to database");
});

module.exports = db;
