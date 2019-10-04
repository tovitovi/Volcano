const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'client',
    passwordField: 'password',
    passReqToCallBack: true
}, async(client, password, person, done) => {
    const newUser = new User();
    newUser.client = client;
    newUser.password = newUser.encryptPassword(password);
    newUser.person = person;
    await newUser.save();
    done(null, newUser);

}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'client',
    passwordField: 'password',
    passReqToCallBack: true
}, async(client, password, done) => {
    const user = await User.findOne({ client: client });
    if (!user) {
        return done(null, false, { message: 'User doesn´t exists' });
    }
    if (!user.comparePassword(password)) {
        return done(null, false, { message: 'Incorrect password' });
    }
    done(null, user);

}));