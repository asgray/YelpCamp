var express = require("express"),
router = express.Router(),
Campground = require("../models/campground"),
Comment    = require("../models/comment"),
middleware = require("../middleware");

//INDEX
router.get("/", function(req, res){
   Campground.find( {}, function(err, allCampgrounds) {
      if (err){
         console.log(err);
      }else{
         res.render("campgrounds/index", {campgrounds:allCampgrounds});
      }
   });
});

// NEW - add form
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});

// CREATE - add to list
router.post("/", middleware.isLoggedIn, function(req, res){
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
      id: req.user._id,
      username: req.user.username
   };
   var newCampground = {name: name, price: price, image:image, description:desc,  author:author};
   //create new campground, save to database
   Campground.create( newCampground, function(err, newlyCreated) {
      if (err){
         req.flash("error", "Something went wrong");
         console.log(err);
      }else{
         req.flash("success", "Successfully added campground");
         res.redirect("/campgrounds");
      }
   });
});

// SHOW - more info about one campground
router.get("/:id", function(req, res) {
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if (err){
         console.log(err);
      }else{
         res.render("campgrounds/show", {campground: foundCampground});
      }
   });
});

//EDIT ------------------------------------------------------------------------
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
   // find campground
   Campground.findById(req.params.id, function(err, foundCampground){
      if (err){
         req.flash("error", "Something went wrong");
         res.redirect("/campgrounds");
      } else {
      // no error
         res.render("campgrounds/edit", {campground: foundCampground}); 
      }
   });
});//-------------------------------------------------------------------------

//UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
      if (err){
         req.flash("error", "Something went wrong");
         res.redirect("/campgrounds");
      } else {
         req.flash("success", "Campground Updated");
         res.redirect("/campgrounds/" + req.params.id);
      }
   });
});

//DELETE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
         req.flash("error", "Something went wrong");
         res.redirect("/campgrounds");
      } else {
         req.flash("success", "Campground Deleted");
         res.redirect("/campgrounds");
      }
   });
});

module.exports = router;