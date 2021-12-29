const { DataTypes, Model } = require("sequelize");
module.exports = (sequelize) => {
  class Status extends Model {
    static associate(models) {
      Status.hasMany(models.Tasks, {
        foreignKey: "statusId",
      });
    }
  }
  Status.init(
    {
      statusName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "statuses",
      modelName: "Status",
      timestamps: false,
    }
  );
  return Status;
};
