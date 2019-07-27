module.exports = function (sequelize, DataTypes) {
    //Allowing Null for everything but email as a `User` may be created when referee email is provided.
    var User = sequelize.define("User", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
      },
    });
  ​
    User.associate = function (models) {
      User.belongsToMany(models.Goal, {
        through: {
          model: "userGoals",
          unique: false
        },
        foreignKey: "UserId",
      })
    };
  ​
  ​
    return User;
  };