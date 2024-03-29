const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const passwordCheck = require("../middleware/password");

// routes s'enregistrer et se connecter: user.
router.post("/signup", passwordCheck, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
