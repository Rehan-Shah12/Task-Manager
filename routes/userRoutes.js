import { Router } from "express";
const router = Router();

import {
  addUserController,
  deleteUserByIdController,
  getAllUsersController,
  getUserByIdController,
  updateUserByIdController,
} from "../controllers/userController.js";

// Get All Users
router.get("/", getAllUsersController);

//Add User
router.post("/add", addUserController);

//Get Single User By Id
router.get("/:id", getUserByIdController);

//Delete User By Id
router.delete("/delete/:id", deleteUserByIdController);

//Update User By Id
router.patch("/update/:id", updateUserByIdController);

export default router;
