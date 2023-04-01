import "reflect-metadata";

const { Sequelize } = require("sequelize-typescript");

const connectionInfo = {
  database: "gracifydb",
  username: "root",
  password: "s0m3P4s$w0orD!",
  dialectOptions: {
    host: "localhost",
    port: "3306",
  },
};

export const sequelize = new Sequelize({
  dialect: "mysql",
  ...connectionInfo,
  models: [__dirname + "/*.model.js"],
  benchmark: false,
  // for logging slow queries
  logQueryParameters: false,
  logging: (sql, timing) => {
    if (timing && timing > 200) {
      console.log(sql, timing);
    }
  },
});

export function syncModels() {
  const alter = true;

  console.log("Syncing...");
  sequelize
    .sync({
      alter,
      //disable log when Syncing
      logging: false,
      //logging: console.log
    })
    .then(() => {
      console.log("Synced db.");
    })
    .catch((err) => {
      console.log("Failed to sync db: " + err.message);
    });
}
