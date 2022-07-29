const mysql = require("mysql2/promise");
const config = require("../config");
// const mysql = require("mysql2");

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.execute(sql, params);
  return results;
}

module.exports = {
  query,
};

// const db = mysql
//   .createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "restdb",
//   })
//   .on("error", (err) => {
//     console.log("Failed to connect to Database - ", err);
//   });

// module.exports = db;
