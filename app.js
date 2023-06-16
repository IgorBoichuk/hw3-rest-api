const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
const authRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use("/register", (req, res) => {
  res.redirect(301, "/api/users");
});

app.use("/login", (req, res) => {
  res.redirect(301, "/api/users");
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.message === "Not authorized") {
    res.status(401).json({ error: "Not authorized" });
  } else {
    res.status(500).json({ message: err.message });
  }
});

module.exports = app;
