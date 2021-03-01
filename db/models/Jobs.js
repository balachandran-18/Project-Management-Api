module.exports = (sequelize, DataTypes) =>
	sequelize.define("Jobs", {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false
		},
		sub_category: {
			type: DataTypes.STRING,
			allowNull: false
		},
		job_title: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		job_link: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		location: {
			type: DataTypes.STRING,
			allowNull: false
		},
		experience: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sort: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			defaultValue: 0.00
		},
		job_description: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		mandatory_skills: {
			type: DataTypes.STRING,
			allowNull: false
		},
		responsibilities: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		requirements: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		minimum_experience: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		maximum_experience: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		maximum_salary: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		course_name: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		project_name: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: 1.00
		}
	}, {
		tableName: "jobs",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: false,
		deletedAt: false
	});
