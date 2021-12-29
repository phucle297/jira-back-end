const { DataTypes, Model, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class Comments extends Model {
    static associate(models) {
      Comments.belongsTo(models.Tasks, {
        foreignKey: "taskId",
      });
      Comments.belongsTo(models.Users, {
        foreignKey: "userId",
      });
    }
  }
  Comments.init(
    {
      taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contentComment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "comments",
      modelName: "Comments",
      timestamps: true,
    }
  );

  return Comments;
};
