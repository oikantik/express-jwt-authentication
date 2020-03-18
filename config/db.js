const mongoose = require("mongoose");
const config = require("config");

const dbConnection = async () => {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("db connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = dbConnection;
