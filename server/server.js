const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive')
    , CronJob = require('cron').CronJob
    , dotenv = require('dotenv').config()
    , { server, connection, auth } = require('./serv-config')
    , ctrl = require('./controller')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')

const app = new express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(__dirname + `/../build`));
app.use(session({
    secret: auth,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK,
    scope: 'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    let { displayName, user_id, picture } = profile;
    const db = app.get('db');

    db.get.find_User([user_id]).then(function (users) {
        if (!users[0]) {
            db.add.create_User([
                displayName,
                picture,
                user_id
            ]).then(users => {
                return done(null, users[0].id)
            }).catch(e => console.log(e))
        } else {
            return done(null, users[0].id)
        }
    }).catch(e => console.log(e))
}))

///////////////////////////////////
////TESTING TOPLEVEL MIDDLEWARE////
///COMMENT OUT WHEN AUTH0 READY///
///////////////////////////////////
// app.use((req, res, next) => {
//     if (!req.user) {
//         req.user = {
//             id: 1,
//             email: "mr.peschke@gmail.com",
//             // patreon: 1
//         }
//     }
//     next();
// })

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: `/`
}));

passport.serializeUser((id, done) => {
    done(null, id)
})
passport.deserializeUser((id, done) => {
    app.get('db').get.find_Session_User([id]).then((user) => {
        return done(null, user[0]);
    })
})

app.get('/auth/logout', function (req, res) {
    req.logOut();
    res.redirect(`/`)
})

// ===============================

app.get('/checkLogin', (req, res) => req.user ? res.send('yep') : res.status(500).send('nope'))
app.get('/orders', ctrl.getOrders);
app.get('/domains', ctrl.getDomains);
app.get('/degrees', ctrl.getDegrees);
app.get('/single/:id', ctrl.getSingle);
app.get('/byDomain/:domain', ctrl.getDomain);
app.get('/byOrder/:order', ctrl.getOrder);
app.get('/byLibrary/:degree', ctrl.getDegree);
app.get('/byList/:id', ctrl.getList);
app.get('/getAllLists', ctrl.allLists);
app.get('/getSingleList/:id', ctrl.getSingleList);
app.get('/search', ctrl.search);

app.post('/newList', ctrl.newList);
app.post('/addSpell', ctrl.addSpell);
app.post('/addAllSpells', ctrl.allSpells);

app.patch('/updateListInfo', ctrl.updateListInfo);

app.delete('/deleteList/:id', ctrl.deleteList);
app.delete('/deleteSpell', ctrl.deleteSpell);

// ===============================

massive(connection).then(dbI => {
    app.set('db', dbI)
    app.listen(server, _ => {
        console.log(`life is a song of sadness written in your own hand ${server}`)
    })
})