//validating the token

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ msg: "Unauthorized, token must be provided" });
  try {
    const { exp, _id } = await jwt.verify(token, config.get("secretKey"));
    if (Date.now() >= exp * 1000)
      return res.status(401).json({ msg: "token expired" });
    req._id = _id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Unauthorized" });
  }
};
