const express=require("express");
const router =express.Router();
const bodyParser = require("body-parser")
const key = require("../../setup/keys/tokens.js").TOKEN_KEY;
const helper = require("../../helpers/sessionVerfiy.js")
const userController = require("../../Controllers/userController.js");


// @type    POST
//@route    /api/user/update-password
// @desc    router for update User password
// @access  PRAVITE

router.put("/user/update-password", helper.JWTverify, userController.updatePassword);

module.exports = router;