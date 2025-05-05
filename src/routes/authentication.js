const express = require('express');
const router = express.Router();

const passport = require('passport');
const { v4: uuidv4 } = require('uuid');

const {isLoggedIn,isNotLoggedIn, redirectUser} = require('../lib/auth');
const {getUser, isvalidatedUser, updateToken, updateValidated, updateTypeUser} = require('../lib/user.functions');
const {verifyMail} = require('../lib/emailer');
const helpers = require('../lib/helpers');
const pool = require('../database/database');
const {STRIPE_KEY, STRIPE_IV, PHONE_KEY, PHONE_IV, EMAIL_KEY, EMAIL_IV, ID_USUARIO, ID_ALUMNO, ID_MAESTRO, ID_ADMIN} = require('../config');


router.get('/signup',(req,res) =>{
    homePage = true;
    res.render('auth/signup',{homePage});
});

router.post('/signup',passport.authenticate('local.signup', {
    successRedirect:'/home',
    failureRedirect: '/signup',
    failureFlash: true
}));


router.get('/signin',isNotLoggedIn, async (req,res) =>{
    homePage = true;
    res.render('auth/signin',{homePage});
});

router.post('/signin',(req,res,next) =>{
    passport.authenticate('local.signin',{
        // successRedirect: '/user_type',
        failureRedirect:'/signin',
        failureFlash: true,
    })(req, res, () => {
        if      (req.user.id_tipo_usuario == ID_USUARIO) res.redirect("/home");
        else if (req.user.id_tipo_usuario == ID_ALUMNO) res.redirect("/home");
        else if (req.user.id_tipo_usuario == ID_MAESTRO) res.redirect("/teacher-dashboard")
        else if (req.user.id_tipo_usuario == ID_ADMIN) res.redirect("/admin-dashboard");
    });
});


router.get('/homepage', isNotLoggedIn, (req,res) =>{
    homePage = true
    res.render('auth/homepage', {homePage: true, sidebars: false});
});


router.get('/profile', isLoggedIn, (req,res) =>{
    res.render('profile');
});


router.get('/logout', isLoggedIn, (req,res)=>{
    req.logOut(() => {
        res.redirect('/homepage');
    });
});


router.get('/verify/:info', isLoggedIn, async (req, res) => {
    const info = decodeURIComponent(req.params.info);
    let arr = info.split('&');
    const token = arr[0];
    const id_usuario = arr[1];

    if(parseInt(id_usuario, 10) != req.user.id_usuario){
        req.flash('message', 'Link de verificación no valido');
        res.redirect('/home');
        return;
    }

    const validado = await isvalidatedUser(id_usuario);

    if(validado){
        res.redirect('/home');
        return;
    }

    if(helpers.verifyToken(token, id_usuario)){
        updateToken(id_usuario, '');
        updateValidated(id_usuario, 1);
        updateTypeUser(id_usuario, 1);
        res.render('templates/accepted');
    } else{
        res.render('templates/refused');
    }    
});


router.get('/retry_verifycation/:data', async (req, res) => {
    const data = decodeURIComponent(req.params.data);
    const id_usuario = data.split('&')[1]
    const validado = await isvalidatedUser(id_usuario);

    if(validado){
        res.redirect('/home');
        return;
    }

    await updateToken(id_usuario, uuidv4());
    getUser(id_usuario).then(async (user) => {
        verifyMail(user[0], "SAS <sas@test.com>", await helpers.decryptEmail(user[0].correo_electronico))
        res.render('templates/retry_email');
    });
});


// router.get('/*', (req, res) => {
//     res.send("default")
// });

router.get('/redirect', redirectUser, (req, res) => {});

router.get('/aes/:data', async (req, res) =>{
    const key = STRIPE_KEY;
    const iv = STRIPE_IV;
    const data = req.params.data
    console.log('STRIPE:',STRIPE_KEY, STRIPE_IV)
    const cryptData = helpers.encryptData(STRIPE_KEY, STRIPE_IV, data);
    const decryptData = helpers.decryptData(STRIPE_KEY, STRIPE_IV, cryptData);
    res.json({data, key, iv, cryptData, decryptData});
})

router.get('/daes/:data', async (req, res) => {
    const key = STRIPE_KEY;
    const iv = STRIPE_IV;
    const data = req.params.data
    const decryptData = helpers.decryptData(STRIPE_KEY, STRIPE_IV, data);
    res.json({data, key, iv, decryptData});
})

module.exports = router;