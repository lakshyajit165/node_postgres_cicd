const {
	DB_USER,
	DB_HOST,
	DATABASE,
	DB_HMAC,
	DB_PORT,
	DB_DIALECT,
	DB_POOL_CONNECTION_LIMIT,
	DB_POOL_IDLE_TIMEOUT,
} = require("./env_config");

const dbConfig = {
	user: DB_USER,
	host: DB_HOST,
	DATABASE,
	password: DB_HMAC,
	port: DB_PORT,
	max: DB_POOL_CONNECTION_LIMIT,
	dialect: DB_DIALECT,
	idleTimeoutMillis: DB_POOL_IDLE_TIMEOUT,
};

module.exports = { dbConfig };
