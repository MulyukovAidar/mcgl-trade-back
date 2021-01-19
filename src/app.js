require('dotenv').config();
const express = require('express')
const app = express();
const session = require('express-session');
const passport = require('passport');
const discordStrategy = require('./strategies/discordStrategy');

const PORT = process.env.PORT || 3001;
const authRoot = require('./routes/auth');
const db = require('./database/database');

db.then(() => {
    console.log("Conected to mongoDB")
}).catch(e => console.log(e));


app.use(session({
    secret: 'B1aGt9wzjWBFsAocehGEc4VXh5e-E3fE',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false
}))


app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authRoot);


app.get('/', (req, res) => {
    res.send('Сука, старый уёбок')
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})