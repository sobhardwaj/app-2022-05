const mysql = require("mysql");

const db_con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

db_con.connect((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  } else {
    console.log("DB Connected ... ");
  }
});

module.exports = db_con;
