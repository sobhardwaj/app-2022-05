const express = require("express");
const router = express.Router();
const config = process.env;

const jwt = require("jsonwebtoken");

const varifyToken = (req, res, next) => {
  getBearerToken(req.headers["authorization"], (error, token) => {
    if (error) {
      return res.status(401).json({ success: false, message: error });
    }
    let decoded = "";
    try {
      decoded = jwt.verify(token, "the-super-strong-blast-secrect");
    } catch (error) {
      return res.status(401).send({
        success: false,
        error: "Invalid authorization token",
      });
    }
    if (decoded) {
      // console.log("Authorized ...");
      req.decodedToken = decoded;
      next();
    } else {
      return res.status(401).send({ success: false, error: "2fa is required" });
    }
  });
};

const getBearerToken = (header, callback) => {
  if (header) {
    console.log(header);
    const token = header.split(" ");
    if (token) {
      return callback(null, token[1]);
    } else {
      return callback("Malformed bearer token", null);
    }
  } else {
    return callback("Missing authorization header", null);
  }
};

module.exports = { varifyToken };
