//Set up and import modules
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;

//Configurations
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routers/routes"));
app.set("view engine", "pug");

//Start server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
