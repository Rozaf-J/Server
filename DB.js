let pgp = require("pg-promise")();
let db = pgp("postgres://postgres:0803@localhost:5432/Users");
let table = "user";
const { body, validationResult } = require("express-validator");

exports.get_view_Users = (req, res) => {
  db.any("SELECT * FROM " + table)
    .then((rows) => {
      res.render("./table", { users: rows });
    })
    .catch((e) => console.log(e));
};

exports.add_view_Users = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("./Alarm");
  }

  let text = "INSERT INTO " + table + " (name, age) VALUES ($1, $2)";
  let values = [req.body.name, req.body.age];

  db.any("SELECT * FROM " + table)
    .then((rows) => {
      const checkUsername = (obj) => obj.name === req.body.name;

      if (!rows.some(checkUsername)) {
        db.any(text, values).catch((e) => console.log(e));
      } else console.log("db already has, ", values);
      db.any("SELECT * FROM " + table)
        .then((rows) => {
          res.render("./table", { users: rows });
        })
        .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
};

exports.remove_view_user = (req, res) => {
  let text = "DELETE FROM " + table + " WHERE name=$1";
  let values = [req.body.name];

  db.any(text, values)
    .then(() => {
      console.log("Deleted" + values, req.body);
      res.redirect("/add");
    })
    .catch((e) => console.log(e));
};

exports.update_view_user = (req, res) => {
  let text = "UPDATE " + table + " SET age=$1 WHERE name = $2";
  let values = [req.body.age, req.body.name];

  db.any(text, values)
    .then(() => {
      console.log("Updated");
      res.redirect("/add");
    })
    .catch((e) => console.log(e));
};
