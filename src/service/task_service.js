const {
    getAllTasksFromDB,
    getTaskByIdFromDB,
    createTaskInDB,
    updateTaskInDB,
    deleteTaskFromDB,
} = require("../repository/task_repository");

const testServerResponse = (req, res) => {
    return res.status(200).send({ message: "Server is running!" });
};

const getAllTasks = async (req, res) => {
    try {
        const taskList = await getAllTasksFromDB();
        return res.status(200).send({ data: taskList, message: "Tasks fetched!" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ errorMessage: err.message || "Error fetching tasks!" });
    }
};

const getTaskById = async (req, res) => {
    const taskId = req.params.id;
    try {
        const taskById = await getTaskByIdFromDB(taskId);
        if (!taskById)
            return res.status(404).send({ errorMessage: "No task found with the given id!" });
        return res.status(200).send({ data: taskById, message: "Task fetched!" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ errorMessage: err.message || "Error fetching task!" });
    }
};

const createTask = async (req, res) => {
    const task = req.body;
    try {
        const createdTask = await createTaskInDB(task);
        return res.status(201).send({ message: "Task created!", data: createdTask });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ errorMessage: err.message || "Error creating task!" });
    }
};

const updateTask = async (req, res) => {
    const taskId = req.params.id;
    const taskDetails = req.body;
    try {
        const updateResult = await updateTaskInDB(
            taskId,
            taskDetails.title,
            taskDetails.description,
            taskDetails.completed
        );
        return res.status(200).send({ message: updateResult["message"] });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ errorMessage: err.message || "Error updating task!" });
    }
};

const deleteTask = async (req, res) => {
    const taskId = req.params.id;
    try {
        await deleteTaskFromDB(taskId);
        return res.status(200).send({ message: "Task deleted!" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ errorMessage: err.message || "Error deleting task!" });
    }
};

module.exports = {
    testServerResponse,
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};
