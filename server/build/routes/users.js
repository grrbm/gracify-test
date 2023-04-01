"use strict";
const exp = require("express");
const router = exp.Router();
router.get("/", (req, res) => {
    //Fetch data from backend and return it.
    res.send("This is an example route.");
});
module.exports = router;
