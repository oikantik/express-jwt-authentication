const mongoose = require("mongoose");
const schema = mongoose.Schema;

mongoose.set("useCreateIndex", true);

const UserSchema = schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("all-users", UserSchema);
