const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //Fetch data from backend and return it.
  res.send("This is an example route.");
});

module.exports = router;
