const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
const passport = require('passport');

const { database } = require('./keys');

const adminRoutes = require('./routes/adminRoutes');

const teacherRoutes = require('./routes/teacherRoutes');

// init
const app = express();
require('./lib/passport');


// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');


// middlewares
app.use(session({
    secret: 'algo',
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database),
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


// global variables
app.use((req, res, next) => {
    app.locals.succes = req.flash('succes');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    app.locals.usuarios = req.usuarios;
    next();
});


// routes
app.use(require('./routes'));
app.use(require('./routes/authenticationRoutes'));
app.use('/home', require('./routes/home'));
app.use('/plans', require('./routes/plans'));
app.use('/verification', require('./routes/verification'));
app.use('/create-checkout-session', require('./routes/payment.session'));
app.use('/succes', require('./routes/payment.succes'));

// admin links
app.use('/admin', adminRoutes);
app.use('/admin-dashboard', require('./routes/admin-dashboard'));
app.use('/admin-users', require('./routes/admin.users'));
app.use('/admin-plans', require('./routes/admin.plans'));

// teachers links
app.use('/teacher', teacherRoutes);


// app.use('/logged',require('./routes/logged'));
app.use(express.static(__dirname + '/public'));


// public
app.use(express.static(path.join(__dirname, 'public')));


// start server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});