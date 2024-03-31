const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    graduationYear: { type: Number},
    major: { type: String},
    universityName: { type: String},
    interests: { type: [String]},
    verifiedCredentials:[
        {
            type: Schema.Types.ObjectId,
            ref: "Credential"
        }    
    ],
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Student", StudentSchema);