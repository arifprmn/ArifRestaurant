const { Op } = require("sequelize");
const { Customer, Food, Payment } = require("../models/index");
const midtransClient = require("midtrans-client");
const axios = require("axios");
class mainController {
  static async fetchData(req, res, next) {
    const { page, search } = req.query;
    try {
      let pageQuery = page;
      if (!pageQuery) {
        pageQuery = 1;
      }
      // console.log(pageQuery);
      let searchQuery = search;
      if (!searchQuery) {
        searchQuery = "";
      }
      let foundFoods = await Food.findAndCountAll({
        limit: 4,
        offset: 4 * (pageQuery - 1),
        where: {
          name: { [Op.iLike]: `%${searchQuery}%` },
        },
      });
      res.status(200).json({
        data: {
          foundFoods,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  static async midtransToken(req, res, next) {
    const { foodId } = req.params;
    console.log(req.user);
    try {
      const foundFood = await Food.findByPk(foodId);
      //   console.log(foundFood);
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
      let parameter = {
        transaction_details: {
          order_id:
            "TRANSACTION" + Math.floor(1000000 + Math.random() * 9000000),
          gross_amount: foundFood.price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.user.email,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      console.log(midtransToken);
      const dataPayment = await Payment.create({
        price: foundFood.price,
        CustomerId: req.user.userId,
        status: "Pending",
        FoodId: foodId,
      });
      res.status(201).json({
        data: {
          midtransToken,
          dataPayment,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  static async patchStatus(req, res, next) {
    const { foodId } = req.params;
    try {
      let foundPayment = await Payment.update(
        {
          status: "Success",
        },
        { where: { id: foodId } }
      );
      res.status(201).json({
        message: "Succes for buy this food",
      });
    } catch (err) {
      next(err);
    }
  }

  static async customerHistory(req, res, next) {
    const { userId } = req.user;
    try {
      const foundCustomer = await Customer.findByPk(userId);
      if (!foundCustomer) {
        throw new Error("Customer Not Found");
      }
      console.log(foundCustomer);
      const foundHistory = await Payment.findAll({
        where: {
          CustomerId: userId,
        },
        include: [Food],
      });
      const { data } = await axios({
        url: "https://api.qr-code-generator.com/v1/create",
        methods: "GET",
        params: {
          "access-token":
            "xj96qAEo7Dw5KTSB1RPViWVeN641StwXTJzAu83ume5G0DwQLjuNdEIe8F3KkKcJ",
          qr_code_text: `http://localhost:5173/`,
          image_format: "PNG",
          image_width: 250,
          download: 1,
        },
        responseType: "arraybuffer",
      });
      const base64 = btoa(
        new Uint8Array(data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      res.status(200).json({
        data: {
          foundHistory,
          customer: foundCustomer.username,
          qrCode: base64,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = mainController;
