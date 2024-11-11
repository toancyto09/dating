const express = require("express");
const { RegisterUser, VerifyToken, Login } = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/register", RegisterUser);
router.get("/verify/:token", VerifyToken);
router.post("/login", Login);


module.exports = router;