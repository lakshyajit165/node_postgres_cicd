const models = require("../models/index");
const { QueryTypes, Op } = require("sequelize");
const res = require("express/lib/response");
const tasks = models.tasks;
const sequelizeInstance = models.sequelizeInstance;

const getAllTasksFromDB = async () => {
	try {
		const taskList = await tasks.findAll();
		return taskList;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const getTaskByIdFromDB = async (taskId) => {
	try {
		const taskById = await tasks.findByPk(taskId);
		return taskById;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const createTaskInDB = async (task) => {
	const currentDate = new Date().toISOString();
	try {
		const taskCreated = await sequelizeInstance.query(
			`INSERT INTO TASKS(TITLE, DESCRIPTION, CREATED_BY, DATE_CREATED, DATE_UPDATED) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
			{
				bind: [task.title, task.description, task.created_by, currentDate, currentDate],
				type: QueryTypes.INSERT,
			}
		);
		return taskCreated[0][0];
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const updateTaskInDB = async (taskId, title, description, completed) => {
	const currentDate = new Date().toISOString();
	let updateResult = {};
	try {
		const getTaskById = await tasks.findOne({ where: { id: taskId } });
		if (!getTaskById) {
			updateResult["message"] = "Task not found!";
			return updateResult;
		}
		await sequelizeInstance.query(
			`UPDATE TASKS
				SET TITLE = $1, DESCRIPTION = $2, COMPLETED = $3, DATE_UPDATED = $4
				WHERE ID = $5;
			`,
			{ bind: [title, description, completed, currentDate, taskId], type: QueryTypes.UPDATE }
		);
		updateResult["message"] = "Task updated!";
		return updateResult;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const deleteTaskFromDB = async (taskId) => {
	try {
		await sequelizeInstance.query(`DELETE FROM TASKS WHERE ID=$1`, {
			bind: [taskId],
			type: QueryTypes.DELETE,
		});
	} catch (err) {
		console.error(err);
		throw err;
	}
};

module.exports = {
	getAllTasksFromDB,
	getTaskByIdFromDB,
	createTaskInDB,
	updateTaskInDB,
	deleteTaskFromDB,
};
