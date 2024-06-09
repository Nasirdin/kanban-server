const express = require("express");
const router = express.Router();
const taskController = require("../controller/task.controller");

router.post("/task", taskController.createTask);
router.get("/task", taskController.getAllTasks);
router.put("/task/:id", taskController.updateTaskStatus);

module.exports = router;
