module.exports = (sequelize, DataTypes) => {
    const Project = require("./Project")(sequelize, DataTypes);
    const User = require("./User")(sequelize, DataTypes);

    const TeamUser = sequelize.define("TeamUser", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    }, {
        tableName: "team_user",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at"
    });

    TeamUser.belongsTo(Project, {
        as: "project",
        foreignKey: 'project_id'
    });
    
    TeamUser.belongsTo(User, {
        as: "user",
        foreignKey: 'user_id'
    });

    return TeamUser;
}