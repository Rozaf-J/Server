//Set up and import modules
const cors = require("cors");
const express = require("express");
const mongo = require("./db/mongoConnect");
const app = express();
const port = 3000;

//Configurations
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routers/userRouter"));
app.set("view engine", "pug");

//Start server
app.listen(port, () => {
  mongo.connect();
  console.log(`App listening at http://localhost:${port}`);
});
