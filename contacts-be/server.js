const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorhandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
//To access .env file we use dotEnv pkg
//* place dotEnv always at top
const dotEnv = require("dotenv").config();
connectDb();
const app = express();
const port = process.env.PORT || 5000;

// 1st api ❤
// app.use(cors()); // Enable CORS for all routes
app.use(
  cors({
    origin: ["http://localhost:4200", "http://127.0.0.1:4200"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});
//!app.use - isMiddleware and adding rotes config
app.use(cookieParser());
app.use(express.json()); //to pass (body) client to server
app.use("/api/contacts", require("./routes/contact.Routes"));
app.use("/api/users", require("./routes/user.Routes"));
app.use(errorhandler);

app.listen(port, () => {
  console.log(`node running in ${port}`);
});
