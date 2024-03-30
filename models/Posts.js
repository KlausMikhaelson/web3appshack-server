const mongoos = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    tags: {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model("Post", PostSchema);