// !this file will convert the response format from html to json in thunderClient

const constants = require("../constants");

// param order should be same
const errorhandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  // *Handling validation error seperatly from Constants.js
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "server error",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    default:
      console.log("No error");
      break;
  }
  res.json({ message: err.message, stackTrace: err.stack });
};
module.exports = errorhandler;
