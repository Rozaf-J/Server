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
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.error("smth wrong");
        res.status(400).render("./Alarm");
      }

      try {
        let values = [req.body.name, req.body.age];

        await db.add_user(values);
        await res.redirect(req.get("referer"));
      } catch (e) {
        console.log(e);
      }
    }
  )
  .delete(body("name").isString().isLength({ min: 2 }), async (req, res) => {
    VEH.VErrorHandler(req, res);

    try {
      let values = [req.body.name];

      await db.remove_user(values);
      await res.redirect(req.get("referer"));
    } catch (e) {
      console.log(e);
    }
  })
  .put(
    body("old_name").isString().isLength({ min: 2 }),
    body("old_age").isNumeric(),
    body("new_name").isString().isLength({ min: 2 }),
    body("new_age").isNumeric(),
    async (req, res) => {
      VEH.VErrorHandler(req, res);

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
    }
  );

module.exports = router;
