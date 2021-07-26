//Set up and import modules
const cors = require("cors");
const express = require("express");
// const log = require("Logger");
const app = express();
const port = 3000;

//Configurations
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./src/routes"));
app.set("view engine", "pug");

//Start server
app.listen(port, () => {
  // log.startLogging();
  console.log(`App listening at http://localhost:${port}`);
});
