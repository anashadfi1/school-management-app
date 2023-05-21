const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");



const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "User is not authorized" });
      }
      //req.user = decoded.user;
      req.user = decoded.userFromDB;
      next();
    });
  } else {
    return res.status(401).json({ error: "User is not authorized or token is missing" });
  }
});



module.exports = validateToken;