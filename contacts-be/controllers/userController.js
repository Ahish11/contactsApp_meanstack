//npm i install express-async-handler install
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt"); // used to encrpyt password
const jwt = require("jsonwebtoken"); // for login authentication
const User = require("../models/userModel");
//*we are using moongoose it returns a promise so we need a async.

const registerUser = asyncHandler(async (request, response) => {
  console.log("req body-->", request.body);
  const { username, email, password } = request.body;
  if (!username || !email || !password) {
    response.status(400);
    throw new Error("All Fields are Mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    response.status(400);
    throw new Error("User already register");
  }
  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashedPassword:", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    response.status(201).json({ _id: user.id, email: user.email });
    console.log(user.password, "user.password");
  } else {
    response.status(400);
    throw new Error("User Data is not Valide");
  }
  response.json({ message: "Register User" });
});

//api/users/login
//http://localhost:5001/api/users/login
//after login generates a ACCESS TOKEN ,only authenticated user access private routes
const loginUser = asyncHandler(async (req, res) => {
  console.log("DEBUG: LOGIN INITIATED - COOKIE VERSION RUNNING");
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    res.status(400);
    throw new Error("email || password fields are mandatory");
  }

  // Find user by email
  const user = await User.findOne({ email });
  console.log("Login Attempt:", email);
  console.log("User found in DB:", user ? "Yes" : "No");
  if (user) {
    console.log("Stored Hashed Password:", user.password);
  }

  // Validate user and password
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("Password provided:", password);
  console.log("Password match result:", isMatch);

  if (user && isMatch) {
    // Generate JWT token
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60min" }
    );
    // Respond with the token in a cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600000, // 60 minutes
    });

    res.status(200).json({ success: true, message: "Login successful" });
  } else {
    res.status(401); // Unauthorized
    throw new Error("Unauthorized email or password");
  }
});
// @access private
const currentUser = asyncHandler(async (request, response) => {
  response.json(request.user);
});

// @access private
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

module.exports = { registerUser, loginUser, currentUser, logoutUser };
