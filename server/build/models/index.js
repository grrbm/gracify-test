"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncModels = exports.sequelize = void 0;
require("reflect-metadata");
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
exports.sequelize = new Sequelize(Object.assign(Object.assign({ dialect: "mysql" }, connectionInfo), { models: [__dirname + "/*.model.js"], benchmark: false, 
    // for logging slow queries
    logQueryParameters: false, logging: (sql, timing) => {
        if (timing && timing > 200) {
            console.log(sql, timing);
        }
    } }));
function syncModels() {
    const alter = true;
    console.log("Syncing...");
    exports.sequelize
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
exports.syncModels = syncModels;
