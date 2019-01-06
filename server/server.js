const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive')
    , CronJob = require('cron').CronJob
    , { server, connection, auth } = require('./serv-config')
    , ctrl = require('./controller')
    , session = require('express-session')
    , passport = require('passport')

const app = new express()
app.use(bodyParser.json())
app.use(cors())
app.use(session({
    secret: auth,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

///////////////////////////////////
////TESTING TOPLEVEL MIDDLEWARE////
///COMMENET OUT WHEN AUTH0 READY///
///////////////////////////////////
app.use((req, res, next) =>{
    if(!req.session.user){
        req.session.user = {
            user_id: 1,
            user_name: "harrison ford", 
            email: "adventureBuilder2049@gmail.com", 
            name: "adventure", 
            profile_picture : "http://www.placekitten.com/200/250",
            auth_id: "adsgfhaoibjmoi5wrhgiuaosfngiuasdhg;ioarhdgv;ou"
        }
    }
    next();
})

// ===============================

app.get('/magic', ctrl.getMagic);
app.get('/divine', ctrl.getDivine);
app.get('/single/:id', ctrl.getSingle);

app.patch('/auth', ctrl.updateList)

// ===============================

massive(connection).then(dbI => {
    app.set('db', dbI)
    app.listen(server, _=> {
        console.log(`life is a song of sadness written in your own hand ${server}`)
    })
})