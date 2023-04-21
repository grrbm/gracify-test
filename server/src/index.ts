import { syncModels } from "./models";
const express = require("express");
const app = express();
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:19000", //Expo for iOS and iOS simulator,
  "http://10.0.0.2:19000", //Expo for Android,
  "http://localhost:19006", //Expo for Web,
  "http://localhost:3000", //Our existing origin
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/users.routes")(app);

const PORT = 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started on port " + PORT);
});

syncModels();
