const User = require("../models/UserModel");

exports.register = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (await User.checkIfUserExists(email)) {
    // Dashboard
    console.log("rrr");
    return res.status(400).json({
      error: true,
      msg: "USER_ALREADY_EXISTS",
    });
  }

  let newUser = { email: email, password: password };
  let user = new User(newUser);
  user
    .save()
    .then(() => {
      const userData = {
        id: user.id,
        email: user.email,
      };
      try {
        req.session.user = userData;
        return res.json({
          error: false,
          success: true,
          data:req.session
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
    };
    try {
      req.session.user = payload;
      return res.json({
        error: false,
        success: true
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
