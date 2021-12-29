const { Model, DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class UserTask extends Model {}
  UserTask.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      taskId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Tasks",
          key: "id",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    },
    { sequelize, tableName: "userTask", modelName: "UserTask" }
  );
  return UserTask;
};
