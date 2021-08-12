// 1 - require express
const express = require("express");

// 2 - instance of express
app = express();

// 3 - port
const port = process.env.PORT || 6000;

// 5 - require and configure dotenv
require("dotenv").config();

// 6 - connect to DB
const connectDB = require("./config/connectDB");
connectDB();

// 7 - require routes
const router = require("./routes/contact");
app.use("/api/contacts", router);
app.use("/api/posts/", router);

// create server
app.listen(port, (error) =>
  error
    ? console.log("Can not run server !!!")
    : console.log("Server is running on port ${port} ...")
);
