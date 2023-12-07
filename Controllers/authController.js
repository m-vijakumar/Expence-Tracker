const { cookie } = require("express-validator");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken")
const secert = require("../setup/keys/tokens").TOKEN_KEY
exports.register = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.UserName

  if (await User.checkIfUserExists(email)) {
    // Dashboard
    console.log("rrr");
    return res.status(400).json({
      error: true,
      msg: "USER_ALREADY_EXISTS",
    });
  }

  let newUser = { email: email, password: password, username : username };
  let user = new User(newUser);
  user
    .save()
    .then(() => {
      const userData = {
        id: user.id,
        email: user.email,
        username: user.username
      };
      try {
        req.session.user = userData;

        const token =  jwt.sign({
          data: userData
        }, secert,
        { expiresIn: 60 * 60 });
  
        return res.json({
          error: false,
          success: true,
          authtoken:token
        });
      } catch (error) {
        return res.json({
          error: true,
          msg: "internal Error...!",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: true,
        msg: err.message,
      });
    });
};

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if(!(email && password)){
    return res.json({
      error: true,
      msg: "internal Error...!",
    });
  }
  const user = await User.checkIfUserExists(email);

  console.log(user);
  if (user && (await user.comparePassword(password))) {
    //Dashboard
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username
      
    };
    try {

     const token =  jwt.sign({
        data: payload
      }, secert,
      { expiresIn: 60 * 60 });

      req.session.user = payload;

      return res.json({
        error: false,
        success: true,
        authtoken:token
      });
    } catch (error) {
      return res.json({
        error: true,
        msg: "internal Error...!",
      });
    }
  } else {
    return res.status(401).json({
      error: true,
      msg: "invalid Email or Password",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    //delete req.session.user;
    req.session.destroy();
    return res.json({
      error: false,
      msg: "",
    });
  } catch (error) {
    return res.json({
      error: true,
      msg: error,
    });
  }
};
