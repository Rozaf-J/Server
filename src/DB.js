let pgp = require("pg-promise")();
let db = pgp("postgres://postgres:0803@localhost:5432/Names");
let table = "users";
const { body, validationResult } = require("express-validator");

let textSELECT = "SELECT * FROM " + table;
let textINSERT = "INSERT INTO " + table + " (name, age) VALUES ($1, $2)";
let textDELETE = "DELETE FROM " + table + " WHERE name=$1";
let textUPDATE =
  "UPDATE " + table + " SET name=$1, age=$2 WHERE name = $3 AND age=$4";

function dbQuery(text, value) {
  return db.any(text, value).catch((e) => console.log(e));
}

exports.get_users = () => {
  return dbQuery(textSELECT);
};

exports.add_user = (values) => {
  return dbQuery(textINSERT, values);
};

exports.remove_user = (values) => {
  return db.any(textDELETE, values).catch((e) => console.log(e));
};

exports.update_user = (values) => {
  return db.any(textUPDATE, values).catch((e) => console.log(e));
};
