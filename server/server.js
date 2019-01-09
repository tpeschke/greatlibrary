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

new CronJob('0 0 0 * * *', _ => {
    const a = app.get('db')
    ctrl.updateList({ body: { auth, a } }, null)
}, null, true, 'America/Los_Angeles')

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
// app.use((req, res, next) =>{
//     if(!req.session.user){
//         req.session.user = {
//             id: 1,
//             user_name: "harrison ford", 
//             email: "adventureBuilder2049@gmail.com", 
//             name: "adventure", 
//             profile_picture : "http://www.placekitten.com/200/250",
//             auth_id: "adsgfhaoibjmoi5wrhgiuaosfngiuasdhg;ioarhdgv;ou"
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

app.get('/checkLogin', (req, res) => req.user.id ? res.send('yep') : null)
app.get('/magic', ctrl.getMagic);
app.get('/divine', ctrl.getDivine);
app.get('/orders', ctrl.getOrders);
app.get('/domains', ctrl.getDomains);
app.get('/single/:id', ctrl.getSingle);
app.get('/byDomain/:domain', ctrl.getDomain);
app.get('/byOrder/:order', ctrl.getOrder);
app.get('/byList/:id', ctrl.getList);
app.get('/getAllLists', ctrl.allLists);
app.get('/getSingleList/:id', ctrl.getSingleList);

app.post('/newList', ctrl.newList);
app.post('/addSpell', ctrl.addSpell);

app.patch('/updateAll', ctrl.updateList);
app.patch('/updateListInfo', ctrl.updateListInfo); // updates list name / description

app.delete('/deleteList/:id', ctrl.deleteList);
app.delete('/deleteSpell', ctrl.deleteSpell);

// ===============================

massive(connection).then(dbI => {
    app.set('db', dbI)
    app.listen(server, _ => {
        console.log(`life is a song of sadness written in your own hand ${server}`)
    })
})