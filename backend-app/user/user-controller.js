const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../services/db");
const tokenList = {};

const register = async (req, res) => {
  const errors = validationResult(req);
  const { name, email, password } = req.body;
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const row = await db.query(
      `SELECT email FROM users WHERE email='${req.body.email}'`
    );
    if (row && row.length > 0) {
      return res.status(201).json({
        message: "The E-mail already in use",
      });
    }
    const hashPass = await bcrypt.hash(password, 12);
    const rows = await db.query(
      `INSERT INTO users (name, email, password) VALUES
      ('${name}', '${email}', '${hashPass}')`
    );
    console.log(rows);
    if (rows.affectedRows === 1) {
      return res.status(201).json({
        message: "The user has been successfully registered.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  // set_session_cookie boolean todo
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const row = await db.query(
      `SELECT * FROM users WHERE email='${req.body.email}'`
    );
    console.log(row);
    if (!row && row.length === 0) {
      return res.status(422).json({
        message: "Invalid email address",
      });
    }
    const passMatch = await bcrypt.compare(req.body.password, row[0].password);
    if (!passMatch) {
      return res.status(422).json({
        message: "Incorrect password",
      });
    }
    const data = {
      id: row[0].id,
      name: row[0].name,
      email: row[0].email,
      created_at: row[0].created_at,
      updated_at: row[0].updated_at,
    };
    const theToken = jwt.sign(
      { id: row[0].id },
      "the-super-strong-blast-secrect",
      {
        expiresIn: "24h",
      }
    );
    const refreshToken = jwt.sign(data, "the-super-strong-refresh-secret", {
      expiresIn: "24h",
    });
    const response = {
      status: "Logged in",
      token: theToken,
      refreshToken: refreshToken,
      userData: data,
    };
    tokenList[refreshToken] = response;
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

// TODO
const refreshToken = async (req, res) => {
  // refresh the damn token
  const postData = req.body;
  // if refresh token exists
  if (postData.refreshToken && postData.refreshToken in tokenList) {
    const user = {
      email: postData.email,
      name: postData.name,
    };
    const token = jwt.sign(user, config.secret, {
      expiresIn: config.tokenLife,
    });
    const response = {
      token: token,
    };
    // update the token in the list
    tokenList[postData.refreshToken].token = token;
    res.status(200).json(response);
  } else {
    res.status(404).send("Invalid request");
  }
};

const getUser = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer") ||
      !req.headers.authorization.split(" ")[1]
    ) {
      return res.status(422).json({
        message: "Please provide the token",
      });
    }

    const theToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(theToken, "the-super-strong-blast-secrect");

    const [row] = await db.query(
      `SELECT id,name,email FROM users WHERE id=${decoded.id}`
    );

    if (row.length > 0) {
      return res.json({
        user: row[0],
      });
    }

    res.json({
      message: "No user found",
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  
}
module.exports = { register, login, refreshToken, getUser };
