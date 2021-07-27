const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://Admin:0803@cluster0.sgcom.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const nameSchema = new Schema({
  name: String,
  age: Number,
});
const Names = mongoose.model("Names", nameSchema);

const instance = new Names();
instance.save(function (err) {});
