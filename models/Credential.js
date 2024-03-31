const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CredentialSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Credential", CredentialSchema);