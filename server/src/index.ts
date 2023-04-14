import { syncModels } from "./models";
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/users.routes")(app);

const PORT = 4000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});

syncModels();
