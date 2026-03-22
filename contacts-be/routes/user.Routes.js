const express = require("express");
const router = express.Router();
const {registerUser,loginUser,currentUser,logoutUser} =  require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");//to acces private route

//Get request
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/current").get(validateToken,currentUser); //validate private routes

module.exports = router;
