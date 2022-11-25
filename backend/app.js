const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const path = require("path");
const errorMiddleware = require("./middlewares/error");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const app = express();
//config

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cors({ credentials: true }));
app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(fileupload());

//routes import
const productsRoutes = require("./routes/productRoute");
const usersRoutes = require("./routes/userRoutes");
const ordersRoutes = require("./routes/orderRoutes");
const paymentRoute = require("./routes/paymentRoute");

app.use("/api/v1", productsRoutes);
app.use("/api/v1", usersRoutes);
app.use("/api/v1", ordersRoutes);
app.use("/api/v1", paymentRoute);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// middlewares for error

app.use(errorMiddleware);

module.exports = app;
