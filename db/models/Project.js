module.exports = (sequelize, DataTypes) =>
    sequelize.define("Project", {
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
        batch: {
            type: DataTypes.STRING,
            allowNull: true
        },
        staff_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    }, {
        tableName: "project",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at"
    });