const { DataTypes, Model, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Comments, {
        foreignKey: "userId",
      });
      Users.belongsToMany(models.Projects, {
        through: "userProject",
      });
      Users.belongsToMany(models.Tasks, {
        through: "userTask",
      });
    }
  }
  Users.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Please enter a valid email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          //? Use bcrypt to hash the password
          const hashedPassword = bcrypt.hashSync(value, 12);
          this.setDataValue("password", hashedPassword);
        },
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
            msg: "Please enter a valid phone number",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "User",
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      taskId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "Users",
      timestamps: true,
    }
  );
  return Users;
};
