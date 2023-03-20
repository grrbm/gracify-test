const express = require("express");
const app = express();

const exampleRoute = require("./routes/users");

app.use("/users", exampleRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
