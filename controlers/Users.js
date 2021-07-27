const db = require("../db/postreeDB");

GET_users = async (req, res) => {
  try {
    let data = await db.get_users();
    await res.render("./usersList", { users: data });
  } catch (e) {
    console.log(e);
  }
};

POST_user = async (req, res) => {
  try {
    let values = [req.body.name, req.body.age];

    await db.add_user(values);
    await res.redirect(req.get("referer"));
  } catch (e) {
    console.log(e);
  }
};

DELETE_user = async (req, res) => {
  try {
    let values = [req.body.name];

    await db.remove_user(values);
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
    await db.update_user(values);
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
