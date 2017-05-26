//======================================================
// SETUP
//======================================================
var Campground = require("./models/campground"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Comment    = require("./models/comment"),
    flash      = require("connect-flash"),
    express    = require("express"),
    seedDB     = require("./seeds"),
    methodOverride = require("method-override"),
    passportLocalMongoose = require("passport-local-mongoose"),
    LocalStrategy         = require("passport-local"),
    passport              = require("passport"),
    User                  = require("./models/user"),
    app        = express();

// requiring routes
var 
campgroundRoutes = require("./routes/campgrounds"),
commentRoutes    = require("./routes/comments"),
indexRoutes       = require("./routes/index");


// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://yelpcamp:yelpcamp@ds155091.mlab.com:55091/yelpcamp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static(__dirname + "/public"));
// authentication
app.set("view engine", "ejs");
app.use(require("express-session")({
    secret:"this is a pretty wonky secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(indexRoutes);

// seedDB();

//======================================================
// LISTENER
//======================================================
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started"); 
});