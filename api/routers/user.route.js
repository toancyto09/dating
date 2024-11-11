const express = require("express");
const { UserGender } = require("../controllers/user.controller");


const router = express.Router();

router.put("/users/:userId/gender", UserGender);



module.exports = router;