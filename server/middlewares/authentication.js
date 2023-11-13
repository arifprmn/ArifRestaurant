const { compareToken } = require("../helpers/jwt");
const { Customer } = require("../models/index");
function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;

    const verified = compareToken(access_token);
    if (!verified.id) {
      throw new Error("Unauthorized");
    }
    const { id, username } = verified;
    req.user = {
      userId: id,
      username,
    };
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}
module.exports = authentication;
