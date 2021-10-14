const express               = require("express"),
      app                   = express(),
      bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      flash                 = require("connect-flash"),
      passport              = require("passport"),
      LocalStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      methodOverride        = require("method-override"),
      expressSanitizer      = require("express-sanitizer"),
      Campground            = require("./models/campgrounds"),
      Comment               = require("./models/comment"),
      User                  = require("./models/user"),
      Todo                  = require("./models/todo"),
      seedDB                = require("./seeds");


const commentRoutes = require("./routes/comment"),
    campgroundRoutes = require("./routes/campground"),
    indexRoutes = require("./routes/index"),
    todoRoutes = require("./routes/todo");

mongoose.connect("mongodb://localhost/mycamp1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.use(flash());

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));
app.use(expressSanitizer());

app.locals.moment = require("moment");

//====  Authentication ====== //

app.use(require("express-session")({
    secret: "di da Dracklaus",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// seedDB();  ========= Seeding DataBase //

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})
//============
//   ROUTES
//============

app.use("/camps/:id/comments", commentRoutes);
app.use("/camps", campgroundRoutes);
app.use("/", indexRoutes);
app.use(todoRoutes);


app.listen(3000, function () {
    console.log("running")
})
