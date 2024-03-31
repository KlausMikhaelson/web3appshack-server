const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CredentialSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student"
    },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Credential", CredentialSchema);