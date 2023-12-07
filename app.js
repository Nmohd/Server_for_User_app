const express = require("express");
const app = express();
const connectDB = require("./connection");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const PORT = process.env.PORT || 2080;
console.log(PORT);

app.use("/api", require("./routes/restApi"));

app.get("/", (req, res) => {
  console.log("Application RUNNING.....");
  res.send("Application RUNNING.....");
});

app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`);
});
