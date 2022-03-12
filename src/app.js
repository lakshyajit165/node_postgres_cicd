const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models/index");
db.sequelizeInstance.sync();
const taskController = require("./controller/task_controller");
const { APP_PORT } = require("./configuration/env_config");

app.use(express.json());
app.use(cors());
app.use(taskController);

app.listen(APP_PORT, () => {
	console.log(`Server ready on port: ${APP_PORT}`);
});

module.exports = app;
