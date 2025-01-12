const { default: mongoose } = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

const User = mongoose.model("Users", auditLogSchema);

module.exports = User;
