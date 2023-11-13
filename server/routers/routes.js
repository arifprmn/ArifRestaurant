const express = require("express");
const authController = require("../controllers/authController");
const mainController = require("../controllers/mainController");
const authentication = require("../middlewares/authentication");
const router = express();
router.post("/register", authController.register);
router.post("/login-google", authController.loginViaGoole);
router.get("/verif/:verificationCode", authController.verifyCode);
router.post("/login", authController.login);
router.get("/food", mainController.fetchData);
router.post(
  "/midtranstoken/:foodId",
  authentication,
  mainController.midtransToken
);
router.patch(
  "/midtrantoken/patch/:foodId",
  authentication,
  mainController.patchStatus
);
router.get("/customerhistory", authentication, mainController.customerHistory);
module.exports = router;
