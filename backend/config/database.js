const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_th_shop",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  } else {
    console.log("Database connection successfully.");
  }
});

module.exports = db;
