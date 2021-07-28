exports.validation = (schema) => (req, res, next) => {
  let body = req.body;

  schema.isValid(body).then((result) => {
    if (result === true) {
      return next();
    } else {
      console.log("error");
      return res.status(400).redirect("/alarm");
    }
  });
};
