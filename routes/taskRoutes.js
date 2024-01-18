import { Router } from "express";
import {
  addTaskController,
  deleteTaskController,
  getAllTasksControllers,
  updateTaskController,
} from "../controllers/taskController.js";
import { paginatedResults } from "../middlewares/paginatedResults.js";
import Task from "../models/taskModel.js";

const router = Router();

// Get All Tasks
router.get("/", paginatedResults(Task), getAllTasksControllers);

// Delete Task
router.delete("/:id", deleteTaskController);

//Add a Task
router.post("/add", addTaskController);

// Update Task by id
router.patch("/update/:id", updateTaskController);

export default router;
