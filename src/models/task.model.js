const { DataTypes } = require("sequelize");
module.exports = (sequelizeInstance) => {
	const tasks = sequelizeInstance.define("tasks", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
		created_by: {
			type: DataTypes.STRING,
		},
		date_created: {
			type: DataTypes.DATE,
		},
		date_updated: {
			type: DataTypes.DATE,
		},
		completed: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	});
	return tasks;
};
