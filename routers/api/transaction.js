const express=require("express");
const router =express.Router();
const bodyParser = require("body-parser")
const key = require("../../setup/keys/tokens.js").TOKEN_KEY;
const helper = require("../../helpers/sessionVerfiy.js")
const transactionController = require("../../Controllers/transactionController.js")
// @type    GET
//@route    /api/all-transaction
// @desc    starting router
// @access  PRAVITE

router.get("/all-transaction", helper.JWTverify, transactionController.getAllTranscations )

// @type    POST
//@route    /api/transcation/add
// @desc    starting router
// @access  PRAVITE

router.post("/add", helper.JWTverify, transactionController.create )

// @type    POST
//@route    /api/transcation/update
// @desc    starting router
// @access  PRAVITE

router.post("/update", helper.JWTverify, transactionController.updateTranscation )


// @type    DELETE
//@route    /api/transcation/delete
// @desc    starting router
// @access  PRAVITE

router.put("/delete", helper.JWTverify, transactionController.deleteTranscation )

module.exports = router;