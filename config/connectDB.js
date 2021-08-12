//require mongoose
const mongoose = require("mongoose");

//connect to DB
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected");
  } catch (error) {
    console.log("Can not connect to DB !!!");
  }
};

module.exports = connectDB;
