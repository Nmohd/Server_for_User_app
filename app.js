const express = require("express");
const app = express();
const connectDB = require("./connection");


connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
