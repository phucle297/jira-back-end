const { DataTypes, Model } = require("sequelize");
module.exports = (sequelize) => {
  class TaskTypes extends Model {
    static associate(models) {
      TaskTypes.hasMany(models.Tasks, {
        foreignKey: "typeId",
      });
    }
  }
  TaskTypes.init(
    {
      taskType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "taskTypes",
      modelName: "TaskTypes",
      timestamps: false,
    }
  );
  return TaskTypes;
};
