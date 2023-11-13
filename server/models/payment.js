"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsTo(models.Customer, { foreignKey: "CustomerId" });
      Payment.belongsTo(models.Food, { foreignKey: "FoodId" });
      // define association here
    }
  }
  Payment.init(
    {
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
      CustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "CustomerId can not be empty",
          },
          notNull: {
            msg: "CustomerId can not be empty",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "status can not be empty",
          },
          notNull: {
            msg: "status can not be empty",
          },
        },
      },
      FoodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "FoodId can not be empty",
          },
          notNull: {
            msg: "FoodId can not be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
