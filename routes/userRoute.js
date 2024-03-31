const express = require("express");
const { createUser, getUser, updateUser, getVerifiedCredentialsofUser, getUserRecommnedationwithSimilarInterests } = require("../controller/userController");
const router = express.Router();

router.post("/user/createUser", createUser);
router.get("/user/getUser", getUser);
router.put("/user/updateUser", updateUser);
router.get("/user/getverifiedcredentialofuser", getVerifiedCredentialsofUser);
router.get("/user/getrecommendation", getUserRecommnedationwithSimilarInterests);

module.exports = router;