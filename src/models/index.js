const Sequelize = require("sequelize");
const {
	DATABASE,
	DB_USER,
	DB_HMAC,
	DB_HOST,
	DB_PORT,
	DB_DIALECT,
	DB_POOL_CONNECTION_LIMIT,
	DB_POOL_IDLE_TIMEOUT,
} = require("../configuration/env_config");
const sequelizeInstance = new Sequelize(DATABASE, DB_USER, DB_HMAC, {
	host: DB_HOST,
	port: DB_PORT,
	dialect: DB_DIALECT,
	pool: {
		max: DB_POOL_CONNECTION_LIMIT,
		idle: DB_POOL_IDLE_TIMEOUT,
	},
	define: {
		timestamps: false,
	},
	logging: false,
});

const db = {};
db.sequelizeInstance = sequelizeInstance;
db.tasks = require("./task.model")(sequelizeInstance);

module.exports = db;
