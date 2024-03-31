const mongoos = require("mongoose");
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "Student"
    },
    discussion: {
        type: Schema.Types.ObjectId,
        ref: "Discussion"
    },
    isStartingThread: { type: Boolean, required: true },
    responses: {
        type: Schema.Types.ObjectId,
        ref: "Thread"
    },
    tags: {
        type: [String],
        required: true
    },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Thread", ThreadSchema);