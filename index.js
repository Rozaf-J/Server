const db = require("./src/DB");
const VEH = require("./src/ValidationErrorHandler");
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
  db.get_users().then((rows) => {
    res.render("./usersList", { users: rows });
  });
});

app.post(
  "/",
  body("name").isString().isLength({ min: 2 }),
  body("age").isNumeric(),
  (req, res) => {
    VEH.VErrorHandler(req, res);

    let values = [req.body.name, req.body.age];

    db.add_user(values);
    res.redirect(req.get("referer"));
  }
);

app.delete("/", body("name").isString().isLength({ min: 2 }), (req, res) => {
  VEH.VErrorHandler(req, res);

  let values = [req.body.name];

  db.remove_user(values).then(() => {
    res.redirect(req.get("referer"));
  });
});

app.put(
  "/",
  body("old_name").isString().isLength({ min: 2 }),
  body("old_age").isNumeric(),
  body("new_name").isString().isLength({ min: 2 }),
  body("new_age").isNumeric(),
  (req, res) => {
    VEH.VErrorHandler(req, res);

    let values = [
      req.body.new_name,
      req.body.new_age,
      req.body.old_name,
      req.body.old_age,
    ];

    db.update_user(values).then(() => {
      res.redirect(req.get("referer"));
    });
  }
);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
