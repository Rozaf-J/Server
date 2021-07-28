const mg = require("../db/mgActions");

GET_users = async (req, res) => {
  try {
    let data = await mg.Get_user();
    await res.render("./usersList", { users: data });
  } catch (e) {
    console.log(e);
  }
};

POST_user = async (req, res) => {
  try {
    await mg.Add_user(req.body);
    await res.redirect(req.get("referer"));
  } catch (e) {
    console.log(e);
  }
};

DELETE_user = async (req, res) => {
  try {
    let value = [req.body.name];

    await mg.Del_user(value);
    await res.redirect(req.get("referer"));
  } catch (e) {
    console.log(e);
  }
};

PUT_user = async (req, res) => {
  try {
    let values = [
      req.body.new_name,
      req.body.new_age,
      req.body.old_name,
      req.body.old_age,
    ];
    await mg.Upd_user(values);
    await res.redirect(req.get("referer"));
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  GET_users: GET_users,
  POST_user: POST_user,
  DELETE_user: DELETE_user,
  PUT_user: PUT_user,
};
