const express = require("express");
const http = require("http");
const favicon = require("serve-favicon");
const logger = require("morgan");
const dateFormat = import("dateformat");
const session = require("express-session");
const date = require("date-and-time");
const authRoute = require("./user/user");
const { varifyToken } = require("./auth/auth");
// require("dotenv").config();
const cors = require("cors");

const config = require("./config");
const lang = require("./routes/lang");
const { route } = require("./routes/lang");
const app = express();
const port = 8080;
const router = express.Router();

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Methods", "GET");
//   next();
// });
app.use("/api/v1", router);
// app.post("/welcome", auth, (req, res) => {
//   res.status(200).send("Welcome 🙌 ");
// });

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error("File Not Found");
//   err.status = 404;
//   next(err);
// });

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.use((req, res, next) => {
  const now = new Date();
  const obj = {
    "Time:": date.format(now, "YYYY/MM/DD HH:mm:ss"),
    "Request Type:": req.method,
    Req: req.path,
  };
  console.log(Object.values(obj));
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.get("/health", (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };
  res.status(200).send(data);
});

app.get("/db_status", (req, res) => {
  // database.ping((err) => {
  //   if (err) return res.status(500).send("MySQL Server is Down");
  //   res.status(200).send("MySQL Server is Active");
  // });
});

router.use("/lang", varifyToken, lang);
router.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
