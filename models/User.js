const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    universityYear: { type: Number},
    major: { type: String},
    universityName: { type: String},
    interests: { type: String},
    verifiedCredentials:[
        {
            type: Schema.Types.ObjectId,
            ref: "Credential"
        }    
    ],
})

module.exports = mongoose.model("User", UserSchema);