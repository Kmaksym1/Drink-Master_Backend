const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/api/user");
const recepiesRouter = require("./routes/api/recepies");
const authRouter = require("./routes/api/auth");
console.log("Hello World!")
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.set("view engine", "ejs");
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));// коли прийде запит на файл зображення, 
// ця midleware скаже що шукаючи в папці public видали розширення файлу

app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use("/api/auth", authRouter);
app.use("/api/recepies", recepiesRouter);


app.use((req, res) => {
  res.status(404).json({ message: "Not found!" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
