const { DataTypes, Model, Sequelize } = require("sequelize");
module.exports = (sequelize) => {
  class Projects extends Model {
    static associate(models) {
      Projects.hasMany(models.Tasks, {
        foreignKey: "projectId",
      });
      Projects.belongsTo(models.ProjectCategory, {
        foreignKey: "categoryId",
        as: "projectCategory",
      });
      Projects.belongsToMany(models.Users, {
        through: "userProject",
      });
    }
  }
  Projects.init(
    {
      projectName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      alias: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creator: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "projects",
      modelName: "Projects",
      timestamps: true,
    }
  );
  return Projects;
};
