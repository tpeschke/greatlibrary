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

new CronJob('0 0 0 * * *', _ => {
    const a = app.get('db')
    ctrl.updateList({ body: { auth, a } }, null)
}, null, true, 'America/Los_Angeles')

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

app.get('/checkLogin', (req, res) => {
    if (req.session.user) {
        res.send(true)
    } else {
        res.send(false)
    }
})
app.get('/login', (req, res) => {
    if (!req.session.user) {
        req.session.user = {
            id: 1,
            user_name: "harrison ford",
            email: "adventureBuilder2049@gmail.com",
            name: "adventure",
            profile_picture: "http://www.placekitten.com/200/250",
            auth_id: "adsgfhaoibjmoi5wrhgiuaosfngiuasdhg;ioarhdgv;ou"
        }
    }
    res.send(true)
})

// ===============================

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