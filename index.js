const cors = require("cors");
const express = require("express");
const db = require("./src/db/dbConnect");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./src/routers/users"));
app.set("view engine", "pug");

db.connect().then(() => {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
});
