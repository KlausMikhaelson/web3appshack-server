const express = require("express");
const User = require("../models/User");
const router = express.Router();

exports.createUser = async (req, res) => {
  try {
    const email = req.body.email;
    // check if the email has the domain of uregina.ca or not using regex
    if (!email.match(/^[a-zA-Z0-9._%+-]+@uregina.ca$/)) {
      return res.status(400).json({ message: "Invalid email domain" });
    }
    const user = new User({
      email: email,
      name: req.body.name,
      universityYear: req.body.universityYear,
      major: req.body.major,
      universityName: req.body.universityName,
      interests: req.body.interests,
    })
      .save()
      .then((user) => {
        return res.status(201).json(user);
      })
      .catch((error) => {
        if (error.code === 11000) {
          return res.status(400).json({ message: "User already exists" });
        } else {
          return res.status(500).json({ message: error.message });
        }
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getUser = async(req, res) => {
    try {
        const userByEmail = await User.findOne({ email: req.params.email });
        if (!userByEmail) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(userByEmail);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.updateUser = async(req, res) => {
    try {
        const userByEmail = await User.findOne({ email: req.params.email });
        if (!userByEmail) {
            return res.status(404).json({ message: "User not found" });
        }
        userByEmail.name = req.body.name;
        userByEmail.universityYear = req.body.universityYear;
        userByEmail.major = req.body.major;
        userByEmail.universityName = req.body.universityName;
        userByEmail.interests = req.body.interests;
        userByEmail.save();
        return res.status(200).json(userByEmail);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getVerifiedCredentialsofUser = async(req, res) => {
    try {
        const userByEmail = await User.findOne({ email: req.params.email })
        if(!userByEmail){
            return res.status(404).json({message: "User not found"});
        }
        const verifiedCredentials = await userByEmail.populate("verifiedCredentials").execPopulate();
        return res.status(200).json(verifiedCredentials);
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
}