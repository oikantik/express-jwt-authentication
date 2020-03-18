const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();
const auth = require("../middleware/auth");

const UserModel = require("../model/User");

/*
desc: Logging in to dashboard
*/

router.get("/", auth, (req, res) => {
  res.json({ msg: `logged in as ${req._id}` });
});

module.exports = router;
