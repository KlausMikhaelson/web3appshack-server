const mongoose = require('mongoose');
const axios = require('axios');
const DiscussionModel = require('./models/Discussions'); // Adjust the path to where your model is defined
const discussionData = require('./../data/discussions');

require("dotenv").config();

const mongoURI = process.env.MONGOURI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connection established'))
    .catch(err => console.error('MongoDB connection error:', err));

async function processDataWithModel(dataArray) {
    for (const data of dataArray) {
        try {
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
    }
}

processDataWithModel(discussionData);
