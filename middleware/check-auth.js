require("dotenv").config();
const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
// chech authentication
module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization :'Bearer Token '
    if (!token) {
      throw new Error("Authentcation failed!");
    }

    const decodedToken = jwt.verify(token, process.env.S3_BUCKETJ);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 403);
    return next(error);
  }
};
