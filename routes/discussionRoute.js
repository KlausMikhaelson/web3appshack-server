const express = require("express");
const discussionController = require("../controller/discussionController");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

router.get("/fetchAll", discussionController.fetchAll);
router.get("/fetchOneWithThreads/:id", discussionController.fetchOneWithThreads);
router.post("/create", discussionController.create);
router.patch("/update/:id", discussionController.update);

module.exports = router;
