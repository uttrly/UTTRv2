module.exports = function(sequelize, DataTypes) {
  var Goal = sequelize.define("Goal", {
    goalName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    oneTime: {
      type: DataTypes.BOOLEAN, //0: false, 1: true
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    refereeEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isInt: true
      }
    },
    status: {
      type: DataTypes.BOOLEAN, //0: false, 1: true
      defaultValue: 0,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    stake: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate: {
      //   notNull: true,
      //   notEmpty: true
      // }
    },    
  });

  Goal.associate = function(models) {
    Goal.belongsToMany(models.User, {
      through: {
        model: "userGoals",
        unique: false
      },
      foreignKey: "GoalId",
    })  
  };

  Goal.associate = function(models) {
    Goal.hasMany(models.Comment);
    Goal.hasMany(models.Report);
  };


  return Goal;
};
