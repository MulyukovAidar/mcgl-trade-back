const DiscorStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const DiscordUser = require('../models/DiscordUser');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await DiscordUser.findById(id);
    if (user) {
        done(null, user);
    }
})


const scopes = ['identify', 'email'];
passport.use(new DiscorStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: scopes
}, async (accessToken, refreshToken, profile, done) => {
    console.log(JSON.stringify(profile));

    try {
        const user = await DiscordUser.findOne({ discordId: profile.id });
        if (user) {
            done(null, user);
        }
        else {
            const newUser = await DiscordUser.create({
                discordId: profile.id,
                username: profile.username
            });
            const savedUser = await newUser.save();
            done(null, savedUser);
        }
    } catch (error) {
        console.log(error);
        done(error, null);
    }


}));
