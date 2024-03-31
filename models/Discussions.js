const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscussionSchema = new Schema({
    name: { type: String, required: true },
    body: { type: String, required: true },
    bannerImageUrl:  { type: String, required: true },
    displayImageUrl: {type: String, required: true},
    threads: {
        type: Schema.Types.ObjectId,
        ref: "Threads"
    },
    tags: {
        type: [String],
        required: true
    },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Discussion", DiscussionSchema);