let pgp = require("pg-promise")();
let db = pgp("postgres://postgres:0803@localhost:5432/Users");

function getUsers(request, response) {
  db.any('SELECT * FROM "exprusr"')
    .then((rows) => {
      console.log(rows);
    })
    .catch((e) => console.log(e));
}

console.log(typeof getUsers());
