import User from "../models/userModel.js";
import { hashPassword } from "../helper/authHelper.js";

// Get All Users
export const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length < 1) {
      return res.json({ message: "No User Avaliable", data: users });
    }
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Server Error, Getting All Users Failed",
      error: error.message,
    });
  }
};

//Add User
export const addUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const secretPass = await hashPassword(password);
    const user = new User({ name, email, password: secretPass });

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Server Error, Adding User Failed",
      error: error.message,
    });
  }
};

// Get Single User By Id
export const getUserByIdController = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      messages: "Server Error, Getting User By Id Failed",
      error: error.message,
    });
  }
};

//Delete User By Id
export const deleteUserByIdController = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    await user.deleteOne();
    res
      .status(200)
      .json({ message: "Successfully Deleted", deletedUser: user });
  } catch (error) {
    res.status(500).json({
      messages: "Server Error, Delete User By Id Failed",
      error: error.message,
    });
  }
};

//Update Users By id
export const updateUserByIdController = async (req, res) => {
  try {
    const userId = req.params.id;
    const keys = Object.keys(req.body);
    const { password } = req.body;
    const allowedToUpdate = ["name", "email", "password"];
    const secretPass = await hashPassword(password);

    const validity = keys.every((key) => allowedToUpdate.includes(key));
    console.log("Validity: ", validity);
    if (validity === false) {
      return res.status(400).json({ message: "Invalid Entity" });
    }
    if (password === "") {
      return res.status(400).json({ message: "Password cannot be empty" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { ...req.body, password: secretPass },
      {
        new: true,
        runValidators: true,
      }
    );

    return res
      .status(200)
      .json({ message: "User Succesfully Updated", UpdatedUser: user });
  } catch (error) {
    res.status(500).json({
      messages: "Server Error, Update User By Id Failed",
      error: error.message,
    });
  }
};
