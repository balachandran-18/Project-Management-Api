module.exports = (sequelize, DataTypes) =>
	sequelize.define("Role", {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		tableName: "role",
		timestamps: false
	});
