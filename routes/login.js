const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();

const UserModel = require("../model/User");

/*
desc: Posting to login path
      and also getting it
*/
router.get("/", (req, res) => {
  res.send({ msg: "there is nothing to see here" });
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ msg: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ msg: "Password incorrect" });
    const token = jwt.sign(
      {
        _id: user._id
      },
      config.get("secretKey"),
      { expiresIn: 60 * 60 }
    );

    res.json({ msg: "login successful", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
