const userCont = require("../controlers/Users");
const validate = require("../middleware/validationMiddleware");
const userSchema = require("../controlers/validators/Schemas/userValidation");
const express = require("express");
const router = express.Router();

router.use(function (req, res, next) {
  next();
});

router
  .route("/")
  .get(userCont.GET_users)
  .post(validate.validation(userSchema), userCont.POST_user)
  .delete(userCont.DELETE_user)
  .put(userCont.PUT_user);

router.route("/alarm").get((req, res) => {
  res.render("../views/Alarm.pug");
});

module.exports = router;
