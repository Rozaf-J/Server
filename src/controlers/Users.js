const db = require("../db/mgActions");

viewUsers = async (req, res) => {
  try {
    let user = await db.Get_user();
    await res.render("../src/views/usersList.pug", { users: user });
  } catch (e) {
    res.render("../src/views/alarm.pug", { error: e });
    console.log(e);
  }
};

addUser = async (req, res) => {
  try {
    await db.Add_user(req.body);
  } catch (e) {
    res.render("../src/views/alarm.pug", { error: e });
    console.log(e);
  }
};

deleteUser = async (req, res) => {
  try {
    let name = [req.body.name];

    await db.Del_user(name);
  } catch (e) {
    res.render("../src/views/alarm.pug", { error: e });
    console.log(e);
  }
};

updateUser = async (req, res) => {
  try {
    let user = [
      req.body.new_name,
      req.body.new_age,
      req.body.old_name,
      req.body.old_age,
    ];
    await db.Upd_user(user);
  } catch (e) {
    res.render("../src/views/alarm.pug", { error: e });
    console.log(e);
  }
};

module.exports = {
  viewUsers,
  addUser,
  deleteUser,
  updateUser,
};
