"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const express = require("express");
const app = express();
const exampleRoute = require("./routes/users");
app.use("/users", exampleRoute);
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});
(0, models_1.syncModels)();
