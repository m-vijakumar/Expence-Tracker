const jwt = require("jsonwebtoken");
const secret = require("../setup/keys/tokens").TOKEN_KEY;
exports.sessionVerfiy = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    return res.json({
      error: true,
      success: false,
      msg: "session",
    });
  }
};

exports.JWTverify = (req, res, next) => {
  console.log(req.headers.authorization);
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const decode = jwt.verify(token, secret);
    console.log(decode);
    req.user = decode.data;
    next();
  } catch (error) {
    console.log(error)
    return res
      .json({
        error: true,
        success: false,
        msg: "Auth FAiled",
      })
      .status(401);
  }
};