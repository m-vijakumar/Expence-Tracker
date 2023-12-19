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
    return res.json({
      success: false,
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
        { expiresIn: 60 * 60 * 20});
  
        return res.json({
          error: false,
          success: true,
          authtoken:token
        });
      } catch (error) {
        return res.json({
          success: false,
          error: true,
          msg: "internal Error...!",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
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
      username: user.username, 
    };
    try {

     const authToken =  jwt.sign({
        data: payload
      }, secert,
      { expiresIn: 60 * 60 * 20});

      console.log(payload)
      req.session.user = payload;

      return res.json({
        error: false, 
        success: true,
        authtoken:authToken
      });
    } catch (error) {
      return res.json({
        error: true,
        msg: "internal Error...!",
      });
    }
  } else {
    return res.json({
      error: true,
      msg: "invalid Email or Password",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    //delete req.session.user;
    console.log("in logout")
    req.session.destroy();
    return res.json({
      error: false,
      msg: "Thank You",
    });
  } catch (error) {
    return res.json({
      error: true,
      msg: error,
    });
  }
};
