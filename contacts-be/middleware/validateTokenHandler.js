const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt"); // used to encrpyt password
const jwt = require("jsonwebtoken");

//1:22:
const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    debugger;
    console.log(authHeader, "::authHeader");
    token = authHeader.split(" ")[1]; //getting the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded.user;
      next();

      if (!token) {
        res.status(401);
        throw new Error("User is ot authorized or thoken is missing");
      }
    });
  }
});
module.exports = validateToken;
