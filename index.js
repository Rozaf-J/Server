const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");

let pgp = require("pg-promise")();
let db = pgp("postgres://postgres:0803@localhost:5432/Users");

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/add", (req, res) => {
  db.any('SELECT * FROM "user"')
    .then((rows) => {
      res.render("./table", { users: rows });
      console.log(rows);
    })
    .catch((e) => console.log(e));
});

app.post("/add", (req, res) => {
  let text = 'INSERT INTO "user" (name, age) VALUES ($1, $2)';
  let values = [req.body.name, req.body.age];

  db.any(text, values).catch((e) => console.log(e));

  db.any('SELECT * FROM "user"')
    .then((rows) => {
      res.render("./table", { users: rows });
      console.log(rows);
    })
    .catch((e) => console.log(e));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
