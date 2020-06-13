module.exports = function(sequelize, DataTypes) {
    var Players = sequelize.define("Players", {
      name: {
        type: DataTypes.STRING, //VARCHAR(255)
        allowNull: false,
        validate: {
          len: [1,25]
        }
      },
      wins: {
        type: DataTypes.INT, //Unlimited characters
        allowNull: false,
        defaultValue: 0
      },
      losses: {
        type: DataTypes.INT, //Unlimited characters
        allowNull: false,
        defaultValue: 0
      },
      bjs: {
        type: DataTypes.INT,
        allowNull: false,
        defaultValue: 0
      }
    });
    return Players;
  };
  