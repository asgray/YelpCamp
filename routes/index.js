var express = require("express"),
router = express.Router(),
passport = require("passport"),
User = require("../models/user");

// root
router.get("/", function(req, res){
   res.render("landing"); 
});

//register 
router.get("/register", function(req, res) {
   res.render("register"); 
});

router.post("/register", function(req, res) {
   var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
      if (err){
         req.flash("error", err.message);
         return res.render("register", {error: err.message});
      } else {
         passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
         });
       }
    });
});

//login
router.get("/login", function(req, res) {
   res.render("login"); 
});

router.post("/login", passport.authenticate("local", 
   {
      successRedirect: "/campgrounds",
      failureRedirect: "/login",
      failureFlash: true
   }),
   function(req, res) {});
   
//logout
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged Out");
   res.redirect("/campgrounds");
});


// 404
router.get("*", function(req, res){
   res.send("narp"); 
});

module.exports = router;