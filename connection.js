const dotenv = require("dotenv");
const mongoose = require("mongoose");

// mongoose
//   .connect(process.env.MONGO_URI)
//   //   .connect("mongodb+srv://unknown:12345@sandbox.1nsjpu6.mongodb.net/user_app")
//   .then(() => {
//     console.log("DB Connected....");
//   })
//   .catch((err) => {
//     console.error(err);
//     console.log("Something went wrong......");
//   });

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
