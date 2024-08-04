const express = require("express");
const loginController = require('../controller/loginController.js')

const router = express.Router();
router.route('/login').get(loginController.login).post(loginController.postLogin)
router.route('/verifyToken').get(loginController.verifyToken)

module.exports = router;