const express = require("express");
const { checkCreateTaskPayload, checkIdValidity } = require("../middlewares/request_parser");
const {
	getAllTasks,
	getTaskById,
	createTask,
	updateTask,
	deleteTask,
} = require("../service/task_service");
const router = express.Router();

router.get("/get_all_tasks", getAllTasks);
router.get("/get_task/:id", [checkIdValidity], getTaskById);
router.post("/create_task", [checkCreateTaskPayload], createTask);
router.put("/update_task/:id", [checkIdValidity], updateTask);
router.delete("/delete_task/:id", [checkIdValidity], deleteTask);

module.exports = router;
