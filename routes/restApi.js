const express = require("express");
const app = express();
const fs = require("fs");
const router = express.Router();
// const rawData = fs.readFileSync('data.json');
// const usersData = JSON.parse(rawData);
const {
  temp,
  getAllUsers,
  getUserById,
  createUser,
  updatedUser,
  deleteUser,
  filterUsers,
  createTeam,
  getTeam,
} = require("../controllers/restApiController");

router.post("/temp", temp);

router.get("/users", getAllUsers);

router.get("/users/:id", getUserById);

router.post("/users", createUser);

router.put("/users/:id", updatedUser);

router.delete("/users/:id", deleteUser);

router.post("/user/filter", filterUsers);

router.put("/team", createTeam);

router.get("/team/:id", getTeam);

module.exports = router;
