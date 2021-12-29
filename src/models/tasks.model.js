const { DataTypes, Model, Sequelize } = require("sequelize");
module.exports = (sequelize) => {
  class Tasks extends Model {
    static associate(models) {
      Tasks.belongsTo(models.Projects, {
        foreignKey: "projectId",
      });
      Tasks.belongsTo(models.Priority, {
        foreignKey: "priorityId",
      });
      Tasks.belongsTo(models.Status, {
        foreignKey: "statusId",
      });
      Tasks.belongsTo(models.TaskTypes, {
        foreignKey: "typeId",
      });
      Tasks.hasMany(models.Comments, {
        foreignKey: "taskId",
      });
      Tasks.belongsToMany(models.Users, {
        through: "userTask",
      });
    }
  }
  Tasks.init(
    {
      taskName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      originalEstimate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      timeTrackingSpent: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      timeTrackingRemaining: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      priorityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize, tableName: "tasks", modelName: "Tasks", timestamps: true }
  );
  return Tasks;
};
