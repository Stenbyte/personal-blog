const { default: mongoose } = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  email: String,
  password: String,
  created: Date,
});

const User = mongoose.model("Users", auditLogSchema);

module.exports = User;
