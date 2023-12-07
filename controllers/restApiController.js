const express = require("express");
const app = express();
const fs = require("fs");

const User = require("../models/userModel");
const rawData = fs.readFileSync("data.json");
const usersData = JSON.parse(rawData);
module.exports.temp = async (req, res) => {
  console.log("STARTED");
  async function insertUsers() {
    try {
      for (const userData of usersData) {
        const existingUser = await User.findOne({ id: userData.id });

        if (!existingUser) {
          await User.create(userData);
          console.log(`User with id ${userData.id} created successfully.`);
        } else {
          console.log(`User with id ${userData.id} already exists.`);
        }
      }
    } catch (error) {
      console.error("Error inserting users:", error);
    }
  }
  await insertUsers();
  console.log("ENDED");
  res.send("ENDED");
};

module.exports.getAllUsers = async (req, res) => {
  let page = req.body.page;

  const usersData = await User.find()
    .skip((page - 1) * 2)
    .limit(2);

  res.status(200).json({
    message: "Success",
    UserData: usersData,
  });
};

module.exports.getUserById = async (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  if (!id) {
    return res.status(400).json({
      message: "Please pass the id",
    });
  }
  console.log(isNaN(id));
  if (isNaN(id)) {
    return res.status(400).json({
      message: "Please pass valid Number id",
    });
  }

  const userData = await User.findOne({ id });

  if (!userData) {
    return res.status(400).json({
      message: "No User Found!",
    });
  }

  res.status(200).json({
    message: "Success",
    userData,
  });
};

module.exports.createUser = async (req, res) => {
  let { id, first_name, last_name, email, gender, avatar, domain, available } =
    req.body;

  if (!id || !first_name) {
    return res.status(400).json({
      message: "Please pass the id and first_name",
    });
  }

  const userData = await User.findOne({ id });

  if (userData) {
    return res.status(422).json({
      message: "This id Already Exist",
    });
  }

  const obj = await User.create({
    id,
    first_name,
    last_name,
    email,
    gender,
    avatar,
    domain,
    available,
  });

  return res.status(201).json({
    message: "Success",
    User: obj,
  });
};

module.exports.updatedUser = async (req, res) => {
  let id = req.params;
  console.log(req.params);
  let { first_name, last_name, email, gender, avatar, domain, available } =
    req.body;
  console.log(req.body);
  // return;
  if (
    first_name ||
    last_name ||
    email ||
    gender ||
    avatar ||
    domain ||
    available
  ) {
    console.log("HEREEEE");
    // return;
    const updatedUser = await User.findOneAndUpdate(
      id,
      {
        $set: {
          first_name,
          last_name,
          email,
          gender,
          avatar,
          domain,
          available,
        },
      },
      { new: true }
    );

    console.log(updatedUser);

    return res.status(200).json({ updatedUser });
  }

  return res.status(400).json({
    message:
      "Please pass any field that you want to edit first_name /last_nmae/gender/email/avatar/domain/avalaible",
  });
};

module.exports.deleteUser = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "Please pass the id",
    });
  }

  if (isNaN(id)) {
    return res.status(400).json({
      message: "Please pass valid Number id",
    });
  }
  const u = await User.find({ id });
  console.log(u);
  // return;
  const deleteduser = await User.findOneAndDelete({ id });

  console.log(deleteduser);

  if (!deleteduser) {
    return res.status(404).json({
      message: "user not found .",
    });
  }

  return res.status(200).json({
    message: "UserDeleted Sucessfully",
    deleteduser,
  });
};

module.exports.filterUsers = async (req, res) => {
  console.log("HEREEEEEEEEEEEEEEEEEEEEE");
  let { domain, gender, available, first_name } = req.body;
  let page = req.body.page || 1;

  console.log(req.body.gender);
  if (!domain || !gender || !available || !first_name) {
    return res.status(400).json({
      message: "Please pass criteroin to be filter.",
    });
  }

  const userData = await User.aggregate([
    {
      $match: {
        $and: [
          { domain: domain },
          { gender: gender },
          { available: available },
          { first_name: { $regex: new RegExp(first_name, "i") } }, // Case-insensitive name search
        ],
      },
    },
    {
      $skip: (page - 1) * 2,
    },
    {
      $limit: 2,
    },
  ]);

  if (!userData.length) {
    return res.status(404).json({
      message: "no user exist with this criterion of filter",
    });
  }

  return res.status(200).json({
    userData,
  });
};

module.exports.createTeam = async (req, res) => {
  let { idArray, teamId } = req.body;
  let teamData;
  let arr = [];

  if (!idArray || !teamId) {
    return res.status(400).json({
      message: "Please Pass idArray and teamId",
    });
  }

  const us = await User.find({ teamId });
  if (us.length) {
    return res.status(400).json({
      message: "Team ID already exists",
    });
  }

  for (id of idArray) {
    teamData = await User.findOneAndUpdate(
      { id },
      { $set: { teamId: teamId } },
      { new: true }
    );
    arr.push(teamData);
  }

  return res.status(201).json({
    team: arr,
  });
};

module.exports.getTeam = async (req, res) => {
  let { page, id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Please Pass Team Id",
    });
  }

  const teamData = await User.find({ teamId: id });
  console.log(teamData);
  if (!teamData.length) {
    return res.status(400).json({
      message: "No Team Exist with this Id",
    });
  }

  return res.status(200).json({
    teamData,
  });
};
