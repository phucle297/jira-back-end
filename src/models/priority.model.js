const { DataTypes, Model } = require("sequelize");
module.exports = (sequelize) => {
  class Priority extends Model {
    static associate(models) {
      Priority.hasMany(models.Tasks, {
        foreignKey: "priorityId",
      });
    }
  }

  Priority.init(
    {
      priority: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "priority",
      timestamps: false,
      modelName: "Priority",
    }
  );
  return Priority;
};
