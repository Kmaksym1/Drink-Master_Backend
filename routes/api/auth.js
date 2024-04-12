const express = require("express");
const { validateBody } = require("../../middlewares");
const {schemas} = require("../../shemas/userNew")
const router = express.Router();
const ctrl = require("../../controllers/authNew")

router.post("/register", validateBody(schemas.registerSchema), ctrl.registerController)
router.post("/login", validateBody(schemas.loginSchema), ctrl.loginController)

module.exports = router 