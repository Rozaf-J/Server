const connect = require("./DB");
const override = require("method-override");
const express = require("express");
const { body, validationResult } = require("express-validator");
const app = express();
const port = 3000;

app.use(override("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/add", connect.get_view_Users);

app.post(
  "/add",
  body("name").isString().isLength({ min: 2 }),
  body("age").isNumeric(),
  connect.add_view_Users
);

app.delete("/add", connect.remove_view_user);

app.put("/add", connect.update_view_user);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
