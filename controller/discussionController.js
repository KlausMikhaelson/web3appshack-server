const express = require('express');
const router = express.Router();
const Discussion = require('../models/Discussions'); // Adjust the path as necessary

// Fetch all discussions
exports.fetchAll = async (req, res) => {
    try {
        const discussions = await Discussion.find();
        res.json(discussions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fetch one discussion by ID, including its threads
exports.fetchOneWithThreads = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id).populate('threads');
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }
        res.json(discussion);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new discussion
exports.create = async (req, res) => {
    const { name, body, bannerImageUrl, displayImageUrl, threads, tags } = req.body;
    const newDiscussion = new Discussion({
        name,
        body,
        bannerImageUrl,
        displayImageUrl,
        threads,
        tags
    });

    try {
        const savedDiscussion = await newDiscussion.save();
        res.status(201).json(savedDiscussion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a discussion
exports.update = async (req, res) => {
    try {
        const updatedDiscussion = await Discussion.findByIdAndUpdate(req.params.id, 
            { $set: req.body },
            { new: true } // This option returns the document after update was applied.
        );
        if (!updatedDiscussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }
        res.json(updatedDiscussion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
