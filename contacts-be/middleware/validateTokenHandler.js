const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt"); // used to encrpyt password
const jwt = require("jsonwebtoken");

//1:22:
const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1]; //getting the token
  } else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
    console.log("DEBUG: TOKEN FOUND IN COOKIE");
  }
  
  if (token) {
    console.log("DEBUG: VALIDATING TOKEN:", token.substring(0, 10) + "...");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        return next(new Error("User is not authorized"));
      }
      req.user = decoded.user;
      next();
    });
  } else {
    res.status(401);
    throw new Error("User is not authorized or token  missing");
  }
});
module.exports = validateToken;
