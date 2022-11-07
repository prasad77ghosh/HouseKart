const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

//routes import
const productsRoutes = require("./routes/productRoute");
const usersRoutes = require("./routes/userRoutes");
const ordersRoutes = require("./routes/orderRoutes");

app.use("/api/v1", productsRoutes);
app.use("/api/v1", usersRoutes);
app.use("/api/v1", ordersRoutes);

// middlewares for error

app.use(errorMiddleware);

module.exports = app;
