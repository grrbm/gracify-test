"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const express = require("express");
const app = express();
const cors = require("cors");
const allowedOrigins = [
    "http://localhost:19000",
    "http://10.0.2.2:19000",
    "http/localhost:19006",
    "http://localhost:3000", // Your existing origin
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || !allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS: " + origin));
        }
    },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/users.routes")(app);
const PORT = 4000;
app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});
(0, models_1.syncModels)();
