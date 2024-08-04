const express = require("express");
const router = require('./routes/loginRoute.js')
const session = require('express-session')

const app = express()

app.use(session({
    secret: 'secret123',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine setup
app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

app.use("/v1/sso", router);
app.get("/v1/sso/login", (req, res, next) => {
    const user = req.session.user || "unlogged";
    console.log("sso Working")
    res.render("login",{ title: "SSO-Server | Home",})
  });

app.use((err, req, res, next) => {
    console.log("middleware error")
    console.error({
      message: err.message,
      error: err,
    });
    const statusCode = err.status || 500;
    let message = err.message || "Internal Server Error";
  
    if (statusCode === 500) {
      message = "Internal Server Error";
    }
    res.status(statusCode).json({ message });
  });

module.exports = app;