const { hashSync, compareSync } = require("bcryptjs");
const { creatToken } = require("../helpers/jwt");
const { Customer } = require("../models/index");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
class authController {
  static async register(req, res, next) {
    const { username, email, password } = req.body;
    try {
      const token = creatToken(username);
      const newCustomer = await Customer.create({
        username,
        email,
        password,
        role: "customer",
        status: "pending",
        verificationCode: token,
      });
      res.status(201).json("Open your email for verification account");
    } catch (err) {
      next(err);
    }
  }
  static async verifyCode(req, res, next) {
    const { verificationCode } = req.params;
    try {
      const foundCustomer = await Customer.findOne({
        verificationCode,
      });
      if (!foundCustomer) {
        throw new Error("Customer Not Found");
      }
      await Customer.update(
        { status: "Active" },
        { where: { id: foundCustomer.id } }
      );
      res.status(200).json({
        message: "Account has been verified",
      });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        throw new Error("Field cannot be empty");
      }
      const foundCustomer = await Customer.findOne({ email });
      if (!foundCustomer || !compareSync(password, foundCustomer.password)) {
        throw new Error("please check your email or password");
      }
      if (foundCustomer.status !== "Active") {
        throw new Error("Verified your account first");
      }
      console.log(foundCustomer.status);
      const access_token = creatToken({
        id: foundCustomer.id,
        username: foundCustomer.username,
        email: foundCustomer.email,
      });
      res.status(200).json({
        statusCode: 200,
        data: {
          name: foundCustomer.username,
          access_token,
          message: `${foundCustomer.username} login successfully`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async loginViaGoole(req, res, next) {
    try {
      const { token } = req.body;
      console.log(token);

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience:
          "137091647178-tuoku2i1s8i7b7vsmv6taess492sr6dv.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      const userEmail = payload.email;
      const username = payload.name;
      const role = "customer";
      const password = "arifpermana123";

      const [foundUser, isCreated] = await Customer.findOrCreate({
        where: {
          email: userEmail,
        },
        defaults: {
          username,
          email: userEmail,
          password,
          role: "customer",
          status: "pending",
          verificationCode: token,
        },
      });

      let message = "User found";

      if (isCreated) {
        message = "User has been created";
      }

      res.status(201).json({
        statusCode: 201,
        message,
        data: {
          email: foundUser.email,
          password: password,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = authController;
