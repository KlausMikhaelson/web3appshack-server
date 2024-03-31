const express = require("express");
const app = express();

const studentRouter = require("./routes/studentRoute");
const discussionsRouter = require("./routes/discussionRoute");

require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors");

console.log(process.env.PORT);
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
    origin: "*"
}));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/v1/student", studentRouter);
app.use('/api/v1/discussions', discussionsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});