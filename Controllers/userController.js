const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken")
const secert = require("../setup/keys/tokens").TOKEN_KEY
const bcrypt = require("bcryptjs");


exports.updateUserdetails = async(req,res) =>{

}

exports.updatePassword = async(req,res) =>{
    
    const oldPassword = req.body.oldpassword;
    const newPassword = req.body.newpassword;

    console.log(oldPassword)
    try {
        const user = await User.findOne({_id : req.user.id})
        console.log("update password " + user)
        if (user && (await user.comparePassword(oldPassword))){
            console.log( "inininin " + oldPassword, newPassword)
            user.password = newPassword;
            user.save()
            .then(()=>{
                return res.json({
                    error: false, 
                    success: true,
                    msg:'password updated'
                  });
            })
            .catch((err)=>{
                console.log(err)
                return res.json({
                    error: true, 
                    success: false,
                    msg:'password not updated'
                  });
            })
        
        }else{
            res.json({
                error: true, 
                success: false,
                msg:'Incorrect Password'
              });
        }
        
    } catch (error) {
        console.log(error)
        res.json({
            error: true, 
            success: false,
            msg:'Internal Error..!'
          });
    }
    

    
}