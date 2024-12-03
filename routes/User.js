const express = require("express");
const User = require("../models/User.js");
const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");
const router = express.Router();

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});
router.post("/signup", WrapAsync(async (req, res) => {
  
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const regisredUser = await User.register(newUser, password);
        console.log(regisredUser);
        req.login(regisredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "welcome to wanderlust");
            res.redirect("/listings");
        });
      
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
}));
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post("/login", savedRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: '/login',
        failureFlash: true
    }),
    async (req, res) => {
        req.flash("success", "welcome to back wanderlust you are logged in");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl); 
    
    
})

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
          return  next(err);
        }
        req.flash("success", "logged out");
        res.redirect("/listings");
    });
});

module.exports = router;
