const { Router } = require("express");
const authController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/user.middleware");
const {registerUser, loginUser, logoutUser} = require("../controllers/user.controller");


const router = Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.post("/logout",authController.logoutUser);

module.exports = router;
