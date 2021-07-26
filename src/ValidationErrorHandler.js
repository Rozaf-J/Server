const { body, validationResult } = require("express-validator");

exports.VErrorHandler = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("./Alarm");
  }
};
