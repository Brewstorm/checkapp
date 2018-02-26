var express = require('express');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var LocalStrategy = require('passport-local').Strategy;
var fs = require('fs');

const Routes = require('./server/routes');
const config = require('./server/config/config');
const db = require('./server/config/db');

passport.use(new LocalStrategy(
    function(username, password, done) {
        return done(null, { username: password });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

const app = express();
app.set('trust proxy', 1); // trust first proxy 
app.set('view options', { layout: false });
app.set('view engine', 'ejs');

app.use(session({
    name: 'checkapp',
    secret: 'checkapp development',
    rolling: true,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 60000
    }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(csrf({ cookie: true }));
app.use(express.static(__dirname + '/build/unbundled'));

app.use(passport.initialize());
app.use(passport.session());

Routes(app);

app.post('/token', passport.authenticate('local'),
    function(req, res) {
        var cookieResponse = req.session.cookie;
        res.send(cookieResponse);
    });

app.get('/api/user', passport.authenticate('local'), function(req, res) {
    res.json(req.user || null);
});

var html = fs.readFileSync('index.html').toString();
app.get('*', function(req, res) {
    res.send(html);
});

app.listen(8080, function() {
    console.log('CheckApp em execução!');
});