const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();

const UserModel = require("../model/User");

/*
desc: Posting to register path
      and also getting it
*/
router.get("/", (req, res) => {
  res.send({ msg: "there is nothing to see here" });
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body; // extracting email and password from req.body
  const salt = await bcrypt.genSalt(14);
  const encryptedPassword = await bcrypt.hash(password, salt);
  const user = new UserModel({ email, password: encryptedPassword });

  try {
    const isFound = await UserModel.findOne({ email });
    if (isFound) return res.status(401).json({ msg: "User already exists" });
    const response = await user.save();
    const token = jwt.sign(
      {
        _id: response._id
      },
      config.get("secretKey"),
      { expiresIn: 60 * 60 }
    );
    res.json({ msg: "registration successful", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
