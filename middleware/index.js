var Campground = require("../models/campground"),
Comment    = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req, res, next){
   // check if logged in
   if (req.isAuthenticated()){
      // find campground
      Comment.findById(req.params.comment_id, function(err, foundComment){
         // error check
         if (err){
             req.flash("error", "Something went wrong");
            res.redirect("back");
         // no error
         } else {
            // check if owner
            if (foundComment.author.id.equals(req.user._id)){
               // if owner, continue
               next();  
            //not owner
            } else {
               req.flash("error", "You can only edit your own comments.")
               res.redirect("back");
            }
         }
      });
   // not logged in
   } else {
      req.flash("error", "You must be logged in to do that.")
      res.redirect("back");
   }
} // checkCampgroundOwnership() -------------------

middlewareObj.checkCampgroundOwnership = function(req, res, next){
   // check if logged in
   if (req.isAuthenticated()){
      // find campground
      Campground.findById(req.params.id, function(err, foundCampground){
         // error check
         if (err){
            req.flash("error", "Campground not found");
            res.redirect("back");
         // no error
         } else {
            // check if owner
            if (foundCampground.author.id.equals(req.user._id)){
               // if owner, continue
             next();  
            //not owner
            } else {
               req.flash("error", "You don't have permission to do that.")
               res.redirect("back");
            }
         }
      });
   // not logged in
   } else {
      req.flash("error", "You must be logged in to do that.")
      res.redirect("back");
   }
} // checkCampgroundOwnership() -------------------

middlewareObj.isLoggedIn = function(req, res, next){
   if (req.isAuthenticated()){
      return next();
   }
   req.flash("error", "You must be logged in to do that.")
   res.redirect("/login");
} // isLoggedIn() ------------------

module.exports = middlewareObj