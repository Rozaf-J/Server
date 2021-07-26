const db = require("./DB");
const { body, validationResult } = require("express-validator");
const VEH = require("./ValidationErrorHandler");
const express = require("express");
const router = express.Router();

router.use(function (req, res, next) {
  next();
});

router
  .route("/")
  .get((req, res) => {
    db.get_users().then((rows) => {
      res.render("./usersList", { users: rows });
    });
  })
  .post(
    body("name").isString().isLength({ min: 2 }),
    body("age").isNumeric(),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("smth wrong");
        res.status(400).render("./Alarm");
      }

      let values = [req.body.name, req.body.age];

      db.add_user(values);
      res.redirect(req.get("referer"));
    }
  )
  .delete(body("name").isString().isLength({ min: 2 }), (req, res) => {
    VEH.VErrorHandler(req, res);

    let values = [req.body.name];

    db.remove_user(values).then(() => {
      res.redirect(req.get("referer"));
    });
  })
  .put(
    body("old_name").isString().isLength({ min: 2 }),
    body("old_age").isNumeric(),
    body("new_name").isString().isLength({ min: 2 }),
    body("new_age").isNumeric(),
    (req, res) => {
      VEH.VErrorHandler(req, res);

      let values = [
        req.body.new_name,
        req.body.new_age,
        req.body.old_name,
        req.body.old_age,
      ];

      db.update_user(values).then(() => {
        res.redirect(req.get("referer"));
      });
    }
  );

module.exports = router;
