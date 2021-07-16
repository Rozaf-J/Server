const db = require("./DB");
const cors = require("cors");
const { body, validationResult } = require("express-validator");
const override = require("method-override");
const express = require("express");

const app = express();
const port = 3000;

app.use(cors());
app.use(override("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  db.get_users().then(users => {
    res.render("./usersList", { users })
  })
});

app.post(
  "/add",
  body("name").isString().isLength({ min: 2 }),
  body("age").isNumeric(),
  db.add_view_Users
);

app.delete(
  "/add",
  body("name").isString().isLength({ min: 2 }),
  db.remove_view_user
);

app.put(
  "/add",
  body("old_name").isString().isLength({ min: 2 }),
  body("old_age").isNumeric(),
  body("new_name").isString().isLength({ min: 2 }),
  body("new_age").isNumeric(),
  db.update_view_user
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
