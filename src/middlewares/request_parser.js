const validator = require("validator");
const checkCreateTaskPayload = (req, res, next) => {
	let errors = [];
	if (!req.body.title) errors.push("title is required");
	if (!req.body.description) errors.push("description is required");
	if (!req.body.created_by) errors.push("created_by is required");
	if (errors.length !== 0) {
		return res
			.status(400)
			.send({ errorMessage: "Error validating request payload!", errors: errors });
	}
	next();
};

const checkIdValidity = (req, res, next) => {
	const taskId = req.params.id;
	if (!validator.isNumeric(taskId)) {
		return res.status(400).send({ errorMessage: "Invalid id provided!" });
	}
	next();
};

module.exports = {
	checkCreateTaskPayload,
	checkIdValidity,
};
