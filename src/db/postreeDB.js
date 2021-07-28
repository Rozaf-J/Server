let pgp = require("pg-promise")();
let postgreDB = pgp("postgres://postgres:0803@localhost:5432/Names");
let table = "users";
const { body, validationResult } = require("express-validator");

let textSELECT = "SELECT * FROM " + table;
let textINSERT = "INSERT INTO " + table + " (name, age) VALUES ($1, $2)";
let textDELETE = "DELETE FROM " + table + " WHERE name=$1";
let textUPDATE =
  "UPDATE " + table + " SET name=$1, age=$2 WHERE name = $3 AND age=$4";

function dbQuery(text, value) {
  return postgreDB
    .any(text, value)
    .catch((e) => console.log("Connection error: ", e));
}

get_users = () => {
  return dbQuery(textSELECT).catch((e) =>
    console.log("QuerySELECT error: ", e)
  );
};

add_user = (values) => {
  return dbQuery(textINSERT, values).catch((e) =>
    console.log("QueryINSERT error: ", e)
  );
};

remove_user = (values) => {
  return dbQuery(textDELETE, values).catch((e) =>
    console.log("QueryDELETE error: ", e)
  );
};

update_user = (values) => {
  return dbQuery(textUPDATE, values).catch((e) =>
    console.log("QueryUPDATE error: ", e)
  );
};

module.exports = {
  get_users: get_users,
  add_user: add_user,
  remove_user: remove_user,
  update_user: update_user,
};
