"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
exports.findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Gets all the users
    user_model_1.User.findAll()
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error ocurred while retrieving users.",
        });
    });
});
exports.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Creates a user
    const { username, password } = req.body;
    if (!username || !password) {
        res.send({
            success: false,
            message: "Must provide username, email and password",
        });
        return;
    }
    const user = {
        username,
        password,
    };
    const createdUser = yield user_model_1.User.create(user);
    if (!createdUser) {
        res.send({
            success: false,
            response: "Something went wrong when creating user.",
        });
        return;
    }
    res.send({
        success: true,
        response: "User created successfully",
    });
});
