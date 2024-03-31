const express = require("express");
const studentController = require("../controller/studentController");
const router = express.Router();
const verifyToken = require('../middlewares/auth');

router.post("/signin", studentController.signin);
router.post("/signup", studentController.signup);
router.get("/getStudent", verifyToken, studentController.getStudent);
router.put("/updateStudent", verifyToken, studentController.updateStudent);
router.get("/getverifiedcredentialofstudent", studentController.getVerifiedCredentialsofStudent);

module.exports = router;
