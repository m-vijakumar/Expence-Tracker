const express=require("express");
const router =express.Router();
const bodyParser = require("body-parser")
const key = require("../../setup/keys/tokens.js").TOKEN_KEY;
const helper = require("../../helpers/sessionVerfiy.js")
const authController = require("../../Controllers/AuthController.js");



// @type    GET
//@route    /api/auth/verify
// @desc    router to check if your logedin or not
// @access  PRAVITE

router.get("/auth/verfiy",helper.sessionVerfiy,(req,res)=>{

    res.json({
        error:false,
        success:true,
        msg:req.session.id
    })
});

// @type    POST
//@route    /api/auth/register
// @desc    router for register User
// @access  PRAVITE

router.post("/auth/register", authController.register )

// @type    POST
//@route    /api/auth/login
// @desc    starting router
// @access  PRAVITE

router.post("/auth/login", authController.login )

// @type    DELETE
//@route    /api/auth/login
// @desc    starting router
// @access  PRAVITE

router.delete("/auth/logout", helper.sessionVerfiy, authController.logout )

module.exports =router;