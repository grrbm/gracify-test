module.exports = (app) => {
  const exp = require("express");
  const router = exp.Router();

  const users = require("../controllers/user.controller");

  router.get("/", users.findAll);
  router.post("/", users.create);

  app.use("/api/users", router);
};
