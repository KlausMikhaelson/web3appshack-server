const express = require("express");
const { createUser, getUser, updateUser, getVerifiedCredentialsofUser } = require("../controller/userController");
const router = express.Router();

router.post("/user/createUser", createUser);
router.get("/user/getUser", getUser);
router.put("/user/updateUser", updateUser);
router.get("/user/getverifiedcredentialofuser", getVerifiedCredentialsofUser);

module.exports = router;
