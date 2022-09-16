const cookieParser = require("cookie-parser");
const express = require("express");
const errorMiddleware = require("./middlewares/error");
const app = express();
app.use(express.json());
app.use(cookieParser())

//routes import
const productsRoutes = require("./routes/productRoute");
const usersRoutes = require("./routes/userRoutes");

app.use("/api/v1", productsRoutes);
app.use("/api/v1", usersRoutes);

// middlewares for error

app.use(errorMiddleware);

module.exports = app;
