const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
// console.log(process.env.MONGO_URI);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");
  } catch (error) {
    console.error(error);
    console.log("Something went wrong......");
  }
};

module.exports = connectDB;

