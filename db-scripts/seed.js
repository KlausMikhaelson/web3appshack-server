const mongoose = require('mongoose');
const DiscussionModel = require('./../models/Discussions'); // Adjust the path to where your model is defined
const { discussionsData } = require('./../data/discussions');

require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connection established'))
    .catch(err => console.error('MongoDB connection error:', err));

async function processDataWithModel(dataArray) {
    dataArray.map(async (data) => {
        try {

            delete data["threads"];
            const existingDocument = await DiscussionModel.findById(data._id);

            if (existingDocument) {
                const updatedDocument = await DiscussionModel.findByIdAndUpdate(data._id, { $set: data }, { new: true });
                console.log('Updated document:', updatedDocument);
            } else {
                const newDocument = new DiscussionModel(data);
                await newDocument.save();
                console.log('Created new document:', newDocument);
            }
        } catch (error) {
            console.error('Error processing data with model:', error);
        }
    })
}

console.log(discussionsData)
processDataWithModel(discussionsData);