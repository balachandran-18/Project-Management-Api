module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define(
        "Project",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            technology: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            status: {
                type: DataTypes.STRING,
                allowNull: true
            },
            staff_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            team_lead_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
        },
        {
            tableName: "project",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: "deleted_at"
        }
    );

    Project.associate = function(models) {
        // associations can be defined here
        Project.belongsTo(models.User, {
            as: "staffUser",
            foreignKey: "staff_id",
        });

        Project.hasMany(models.TeamUser, {
            as: "teamUser",
            foreignKey: "team_lead_id",
            targetKey: "team_lead_id",
        });
    };
    return Project;

}