const express = require("express");
const passport = require("passport");
const router = express.Router();
const path = require("path");

const publicPath = path.join(__dirname, "../../build");

router.post("/api/signup", (req, res) => {
  console.log(req.body);
  passport.authenticate("local-signup", (err, user, info) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (!user) {
      return res.status(401).json(info);
    }
    return res.status(200).json(user);
  })(req, res);
});

router.post("/api/signin", (req, res) => {
  passport.authenticate("local-login", {
    successRedirect: "/api/success",
    failureRedirect: "/api/error",
  })(req, res);
});

router.get("/api/error", (req, res) => {
  res.status(401).json({ message: "Unauthorized", code: 1 });
});

router.get("/api/success", (req, res) => {
  res.status(200).json({ message: "Success", code: 0 });
});

router.delete("/api/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Success", code: 0 });
});

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized", code: 1 });
};

router.get("/api/auth", isAuthenticated, (req, res) => {
  res.status(200).json({ user: req.user, code: 0 });
});

// router.get("*",(req,res)=>{
//   res.sendFile(path.join(publicPath, 'index.html'))
// });

module.exports = router;
