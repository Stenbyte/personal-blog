const { default: mongoose } = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  action: String,
  userId: String,
  details: Object,
  created: Date,
});

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

module.exports = AuditLog;
