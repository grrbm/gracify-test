import { create } from "domain";
import { User } from "../models/user.model";
exports.findAll = async (req, res) => {
  //Gets all the users
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while retrieving users.",
      });
    });
};

exports.create = async (req, res) => {
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

  const createdUser = await User.create(user);

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
};
