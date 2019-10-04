const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const Image = require('../models/image');
const bcrypt = require('bcrypt-nodejs');



//login
router.get('/', (req, res) => {
    res.render('index', { layout: false });
});

router.post('/', passport.authenticate('local-login', {
    successRedirect: '/main',
    failureRedirect: '/',
    passReqToCallback: true
}));
//login End


//Sign In
router.get('/signup', isAuthenticated, (req, res, next) => {
    if (req.user.client === 'tovi') { res.render('signup'), { layout: false } } else {
        res.render('main_page');
    }
});

router.post('/signup', async(req, res, next) => {
    const newUser = new User();
    const image = new Image();
    newUser.client = req.body.client;
    newUser.password = newUser.encryptPassword(req.body.password);
    newUser.person = req.body.person;
    image.title = "logo";
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/public/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    image.user = req.body.client;
    image.logo = true;
    newUser.logo = image.path;

    await image.save();
    await newUser.save();

    res.redirect('main');

});
//Sign In End

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

//Change Password
router.get('/password', (req, res, next) => {
    res.render('password');
});

router.post('/password', async(req, res, next) => {
    const user = await User.findOne({ client: req.user.client });
    const { old_password, password } = req.body;
    if (!user.comparePassword(old_password)) {
        res.send("Incorrect Password")
    } else {
        user.password = user.encryptPassword(password);
        user.save()
    };

    res.redirect('/main');
});

/*Change Welcom Message

*/
router.get('/change_welcome', async(req, res, next) => {
    const user = await User.findOne({ client: req.user.client });
    res.render('change_welcome', { user: user });
});
router.post('/change_welcome', async(req, res, next) => {
    console.log(req.body.person);
    const user = await User.findOne({ client: req.user.client });
    user.person = req.body.person;
    user.save();
    res.redirect('/main');
});


function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};



module.exports = router;