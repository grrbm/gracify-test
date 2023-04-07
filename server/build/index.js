"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const express = require("express");
const app = express();
const cors = require("cors");
const exampleRoute = require("./routes/users");
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/users", exampleRoute);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/users.routes")(app);
const PORT = 4000;
app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});
(0, models_1.syncModels)();
