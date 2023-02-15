const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send("Access denied");

  try {
    const secretkey = process.env.JWT_SECRET_KEY;
    const user = jwt.verify(token, secretkey);

    req.user = user;

    next();
  } catch (error) {
    res.status(400).send("Access denied. Invalid token");
  }
};

const isAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Access denied. Not Authorized");
    }
  });
};


module.exports = {auth, isAdmin};