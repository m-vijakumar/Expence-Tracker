const express=require("express");
const router =express.Router();
const bodyParser = require("body-parser")
const key = require("../../setup/keys/tokens.js").TOKEN_KEY;
const helper = require("../../helpers/sessionVerfiy.js")
const dashboardController = require("../../Controllers/dashboardController.js")
const transactionController = require("../../Controllers/TransactionController.js")
// @type    GET
//@route    /api/all-transaction
// @desc    starting router
// @access  PRAVITE

router.get("/all-transaction", helper.JWTverify, transactionController.getAllTranscations )

