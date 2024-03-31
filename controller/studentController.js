const express = require("express");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");

const router = express.Router();

exports.signin = async (req, res) => {
  try {
    const email = req.body.email;

    const existingStudent = await Student.findOne({
      email: email
    });

    if (!existingStudent) {
      return res.status(401).json({ message: "Invalid credentials!"}); // 401 Unauthorized
    }

    // Assuming the credentials are valid, generate a JWT
    const token = jwt.sign(
      { email: existingStudent.email }, // Payload
      JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration time
    );

    // Return the JWT token in the response
    return res.status(200).json({ 
      email: existingStudent.email,
      name: existingStudent.name,
      token: token 
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.signup = async (req, res) => {
  try {
    const email = req.body.email;
    // check if the email has the domain of uregina.ca or not using regex
    if (!email.match(/^[a-zA-Z0-9._%+-]+@uregina.ca$/)) {
      return res.status(400).json({ message: "Invalid email domain" });
    }
    const student = new Student({
      email: email,
      name: req.body.name,
      universityYear: req.body.universityYear,
      major: req.body.major,
      universityName: req.body.universityName,
      interests: req.body.interests,
    })
      .save()
      .then((student) => {
        return res.status(201).json(student);
      })
      .catch((error) => {
        if (error.code === 11000) {
          return res.status(400).json({ message: "Student already exists" });
        } else {
          return res.status(500).json({ message: error.message });
        }
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getStudent = async(req, res) => {
    try {
        const studentByEmail = await Student.findOne({ email: req.params.email });
        if (!studentByEmail) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json(studentByEmail);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.updateStudent = async(req, res) => {
    try {
        const studentByEmail = await Student.findOne({ email: req.params.email });
        if (!studentByEmail) {
            return res.status(404).json({ message: "Student not found" });
        }
        studentByEmail.name = req.body.name;
        studentByEmail.universityYear = req.body.universityYear;
        studentByEmail.major = req.body.major;
        studentByEmail.universityName = req.body.universityName;
        studentByEmail.interests = req.body.interests;
        studentByEmail.save();
        return res.status(200).json(studentByEmail);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getVerifiedCredentialsofStudent = async(req, res) => {
    try {
        const studentByEmail = await Student.findOne({ email: req.params.email })
        if(!studentByEmail){
            return res.status(404).json({message: "Student not found"});
        }
        const verifiedCredentials = await studentByEmail.populate("verifiedCredentials").execPopulate();
        return res.status(200).json(verifiedCredentials);
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
}

exports.recommendStudentsWithSimilarInterests = async(req, res) => {
    try {
        const studentByEmail = await Student.findOne({ email: req.params.email });
        if (!studentByEmail) {
            return res.status(404).json({ message: "Student not found" });
        }
        const students = await Student.find({ interests: { $in: studentByEmail.interests } });
        return res.status(200).json(students);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// exports.getStudents