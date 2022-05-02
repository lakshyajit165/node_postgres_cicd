const express = require("express");
const { checkCreateTaskPayload, checkIdValidity } = require("../middlewares/request_parser");
const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    testServerResponse,
} = require("../service/task_service");
const router = express.Router();

router.get("/test", testServerResponse);

/**
 * fetches list of all tasks
 */
router.get("/get_all_tasks", getAllTasks);

/**
 * fetches a task by its ID
 * @id { string }
 */
router.get("/get_task/:id", [checkIdValidity], getTaskById);

/**
 * Creates a task
 * @title { string }
 * @description { string }
 * @created_by { string }
 * @completed { boolean }
 */
router.post("/create_task", [checkCreateTaskPayload], createTask);

/**
 * Updates a task by its id
 * @id { string }
 */
router.put("/update_task/:id", [checkIdValidity], updateTask);

/**
 * Deletes a task by its id
 * @id { string }
 */
router.delete("/delete_task/:id", [checkIdValidity], deleteTask);

module.exports = router;
