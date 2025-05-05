const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database/database');
const helpers = require('../lib/helpers');
const {welcomeMail} = require('../lib/emailer');
const {createUser, insertNewUser, existEmail, existUser, userDataToText} = require('./user.functions');
// const { v4: uuidv4 } = require('uuid');
const {RECAPTCHA_KEY, EMAIL_KEY, EMAIL_IV} = require('../config');


passport.use('local.signin', new LocalStrategy({
    usernameField:'email',
    passwordField:'pass',
    passReqToCallback: true
}, async (req,username,pass,done) =>{
    const captchaResponse = req.body["g-recaptcha-response"];
    const skey = RECAPTCHA_KEY;
    
    if (!await helpers.verifyCaptcha(skey, captchaResponse)){
        return done(null, false, req.flash('message', 'Captcha Rechazado'));
    }
    const email = await helpers.encryptData(EMAIL_KEY, EMAIL_IV, req.body.email);
    const rows = await pool.query('SELECT * FROM usuarios WHERE correo_electronico = ?',[email]);

    if(rows.length <= 0){   
        console.log('no existe ese correo')
        return done(null, false, req.flash('message','Email o Contraseña incorrectos'));
    }
    
    const user = rows[0];
    let validPassword = await helpers.matchPassword(pass,user.contrasenha);

    if(validPassword) return done(null, user, req.flash('succes','Bienvenido ' + username));
    else{console.log('contraseña incorrecta'); return done(null, false, req.flash('message','Email o Contraseña incorrectos'));} 
}));


passport.use('local.signup', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const captchaResponse = req.body["g-recaptcha-response"];
    const skey = RECAPTCHA_KEY;

    if (!await helpers.verifyCaptcha(skey, captchaResponse)){
        console.log('captcha rechazado');
        return done(null, false, req.flash('message', 'Captcha Rechazado'));
    }

    const email = await helpers.encryptData(EMAIL_KEY, EMAIL_IV, req.body.email);

    if(await existEmail(email)){
        return done(null, false, req.flash('message','Ese correo ya estaba registrado'));
    }

    const newUser = await createUser(username, req.body.last_name, req.body.num_phone, req.body.email, password);
    const result = await insertNewUser(newUser);
    newUser.id_usuario = result.insertId;
    welcomeMail(newUser, "SAS <sas@test.com>",req.body.email);
    return done(null, newUser);
}));


passport.serializeUser((user,done) => {
    done(null,user.id_usuario);
});


passport.deserializeUser(async (id, done) =>{
    let rows = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?',[id]);
    done(null, await userDataToText(rows[0]));
});