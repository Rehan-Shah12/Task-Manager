import Task from "../models/taskModel.js";

// Get All Tasks
export const getAllTasksControllers = async (req, res) => {
  try {
    const tasks = res.paginatedResults;
    return res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Server Error, Getting All Tasks Failed",
      error: error.message,
    });
  }
};

// Delete A Task
export const deleteTaskController = async (req, res) => {
  try {
    const tasksId = req.params.id;

    const existingTask = await Task.findByIdAndDelete(tasksId);

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task Deleted Succesfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server Error, Deleting Task Failed",
      error: error.message,
    });
  }
};

// Add a Task
export const addTaskController = async (req, res) => {
  try {
    const { task, completed } = req.body;

    const taskBody = new Task({ task, completed });
    await taskBody.save();
    res.status(201).json(taskBody);
  } catch (error) {
    res.status(500).json({
      message: "Serveer Error, Adding Task Failed",
      error: error.message,
    });
  }
};

// Update a Task by Id
export const updateTaskController = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const tasksId = req.params.id;
    const allowedUpdates = ["task", "completed"];
    const isValidOperation = updates.every((update) => {
      return allowedUpdates.includes(update);
    });

    if (isValidOperation === false) {
      return res.status(400).json({ message: "Invalid Field" });
    }

    const existingTask = await Task.findByIdAndUpdate(tasksId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!existingTask) {
      return res.status(404).json({ message: "Task not Found" });
    }
    res.json({ message: "Task updated successfully", task: existingTask });
  } catch (error) {
    res.status(500).json({ message: "Server Error, Updating Task Failed" });
  }
};
