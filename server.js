const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 3001 || process.env.PORT;

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

app.use("/api/v1/", require("./routes/userRoute"));

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});