const express = require("express");
const router = express.Router();
const {
	register,
	login,
	getUserData,
	deleteUsers,
	blockUsers,
	unblockUsers,
} = require("../controllers/users");

router.post("/register", register);
router.post("/login", login);
router.get("/", getUserData);
router.post("/delete", deleteUsers);
router.post("/block", blockUsers);
router.post("/unblock", unblockUsers);

module.exports = router;
