const express = require("express");
const router = express.Router();
const config = process.env;
const { body } = require("express-validator");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { register, login, getUser } = require("../user/user-controller");

// Register
// router.post("/register", async (req, res) => {
//   try {
//     const { first_name, last_name, email, password } = req.body;
//     if (!(email && password && first_name && last_name)) {
//       res.status(400).send("All input is required");
//     }
//     const oldUser = await User.findOne({ email });
//     if (oldUser) {
//       return res.status(409).send("User Already Exist. Please Login");
//     }
//     const encryptedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       first_name,
//       last_name,
//       email: email.toLowerCase(), // sanitize: convert email to lowercase
//       password: encryptedPassword,
//     });
//     const token = jwt.sign(
//       { user_id: user._id, email },
//       process.env.TOKEN_KEY,
//       {
//         expiresIn: "2h",
//       }
//     );
//     user.token = token;
//     res.status(201).json(user);
//   } catch (error) {
//     console.log(error);
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email && password) {
//       res.send(400).send("All input is required ");
//     }
//     const user = await User.findOne({ email });
//     if (user && (await bcrypt.compare(password, user.password))) {
//       const token = jwt.sign(
//         { user_id: user._id, email },
//         process.env.TOKEN_KEY,
//         { expiresIn: "2h" }
//       );
//       user.token = token;
//       res.send(200).json(user);
//     }
//     res.status(400).send("Invalid Credentials");
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post(
  "/register",
  [
    body("name", "The name must be of minimum 3 characters length")
      .notEmpty()
      .escape()
      .trim()
      .isLength({ min: 3 }),
    body("email", "Invalid email address").notEmpty().escape().trim().isEmail(),
    body("password", "The Password must be of minimum 4 characters length")
      .notEmpty()
      .trim()
      .isLength({ min: 4 }),
  ],
  register
);

router.post(
  "/login",
  [
    body("email", "Invalid email address").notEmpty().escape().trim().isEmail(),
    body("password", "The Password must be of minimum 4 characters length")
      .notEmpty()
      .trim()
      .isLength({ min: 4 }),
  ],
  login
);

router.get("/getuser", getUser);

module.exports = router;
