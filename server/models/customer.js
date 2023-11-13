"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
const sendConfirmationEmail = require("../helpers/nodemailer");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Payment, { foreignKey: "CustomerId" });
    }
  }
  Customer.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "username can not be empty",
          },
          notNull: {
            msg: "username can not be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "email can not be empty",
          },
          notNull: {
            msg: "email can not be empty",
          },
          isEmail: {
            msg: "wrong format email",
          },
        },
        unique: {
          msg: "email has already been registered",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "password can not be empty",
          },
          notNull: {
            msg: "password can not be empty",
          },
        },
      },
      role: DataTypes.STRING,
      status: DataTypes.STRING,
      verificationCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  Customer.beforeCreate((instance, options) => {
    instance.password = hashPassword(instance.password);
  });
  Customer.afterCreate((customer, options) => {
    sendConfirmationEmail(
      customer.username,
      customer.email,
      customer.verificationCode
    );
  });
  return Customer;
};
