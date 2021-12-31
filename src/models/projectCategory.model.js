const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class ProjectCategory extends Model {
    static associate(models) {
      ProjectCategory.hasMany(models.Projects, {
        foreignKey: "categoryId",
        as: "projects",
      });
    }
  }
  ProjectCategory.init(
    {
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "projectCategory",
      timestamps: false,
      modelName: "ProjectCategory",
    }
  );
  return ProjectCategory;
};
