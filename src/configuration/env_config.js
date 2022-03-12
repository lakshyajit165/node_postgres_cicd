const dotenv = require("dotenv");
dotenv.config();
module.exports = {
	APP_PORT: +process.env.APP_PORT,
	DB_USER: process.env.DB_USER,
	DB_HOST: process.env.DB_HOST,
	DATABASE: process.env.DATABASE,
	DB_HMAC: process.env.DB_HMAC,
	DB_PORT: process.env.DB_PORT,
	DB_DIALECT: process.env.DB_DIALECT,
	DB_POOL_CONNECTION_LIMIT: +process.env.DB_POOL_CONNECTION_LIMIT,
	DB_POOL_IDLE_TIMEOUT: +process.env.DB_POOL_IDLE_TIMEOUT,
};
