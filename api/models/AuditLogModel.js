const { default: mongoose } = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  userId: { type: String, required: false },
  details: { type: Object, required: false },
  created: { type: Date, default: Date.now },
});

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

module.exports = AuditLog;
