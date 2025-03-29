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
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    res.status(400);
    throw new Error("email || password fields are mandatory");
  }

  // Find user by email
  const user = await User.findOne({ email });

  // Validate user and password
  if (user && (await bcrypt.compare(password, user.password))) {
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
      { expiresIn: "10min" }
    );
    // Respond with the token
    res.status(200).json({ accessToken });
  } else {
    res.status(401); // Unauthorized
    throw new Error("Unauthorized email or password");
  }
});
// @access private
const currentUser = asyncHandler(async (request, response) => {
  response.json(request.user);
});

module.exports = { registerUser, loginUser, currentUser };
