"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Food.hasMany(models.Payment, { foreignKey: "FoodId" });
    }
  }
  Food.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "name can not be empty",
          },
          notNull: {
            msg: "name can not be empty",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "price can not be empty",
          },
          notNull: {
            msg: "price can not be empty",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "description can not be empty",
          },
          notNull: {
            msg: "description can not be empty",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "imageUrl can not be empty",
          },
          notNull: {
            msg: "imageUrl can not be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Food",
    }
  );
  return Food;
};
