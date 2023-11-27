jwt = require("jsonwebtoken");

exports.cookieJwtAuth = (req, res, next) => {
  const { token } = req.cookies;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    next();
  }
};
