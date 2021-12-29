const { Model, DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class UserProject extends Model {}
  UserProject.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      projectId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Projects",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "userProject",
      modelName: "UserProject",
      timestamps: true,
    }
  );
  return UserProject;
};
