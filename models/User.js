const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true},
    name: { type: String },
    universityYear: { type: Number},
    major: { type: String},
    universityName: { type: String},
    interests:
    [
        {
            type: String
        }
    ] 
    ,
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
})

module.exports = mongoose.model("User", UserSchema);