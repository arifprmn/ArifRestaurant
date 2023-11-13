const errorHandler = (err, req, res, next) => {
  console.log(err, "MMM");
  let statusCode = 500;
  let message = "Internal Server Error";
  if (
    err.name === "SequelizeUniqueConstraintError" ||
    err.name === "SequelizeValidationError"
  ) {
    statusCode = 400;
    message = err.errors[0].message;
  }
  if (err.message === "Customer Not Found") {
    statusCode = 404;
    message = "Customer Not Found";
  }
  if (err.message === "Forbidden") {
    statusCode = 403;
    message = "You don't have access to do this action";
  }
  if (err.message === "Verified your account first") {
    statusCode = 401;
    message = "Verified your account first";
  }
  if (err.message === "Unauthorized" || err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid Token";
  }
  if (err.message === "Field cannot be empty") {
    statusCode = 400;
    message = "Field cannot be empty";
  }
  if (err.message === "email has already been registered") {
    statusCode = 400;
    message = "email has already been registered";
  }
  if (err.message === "please check your email or password") {
    statusCode = 402;
    message = "please check your email or password";
  }
  res.status(statusCode).json({
    statusCode,
    message,
  });
};

module.exports = errorHandler;
