const express = require('express');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const multer = require('multer');
const uuid = require('uuid');
const { format } = require('timeago.js');

//multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});
//Initializations
require('./database');
require('./passport/local');

//static files
app.use('/public', express.static(path.join(__dirname, '/public')));



//Server settings
app.set('port', process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));


//midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'DyG2018',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(multer({
    storage: storage, //storage
    dest: '/public/uploads',
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|mp4|pdf|ai/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: File not supported")
    }
}).single('image'));


/*app.use((req, res, next) =>{
    app.locals.signupMessage = req.flash('signupMessage');
	next();
});
*/

//Global Variables
app.use((req, res, next) => {
    app.locals.format = format;
    next();
});

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

//routes
app.use(require("./routes/routes.js"));
app.use(require("./routes/users.js"));
app.use(require("./routes/uploads.js"));



app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});