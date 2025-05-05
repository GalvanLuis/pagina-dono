const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController')
const passport = require('passport');

const { v4: uuidv4 } = require('uuid');

const {isLoggedIn,isNotLoggedIn, redirectUser} = require('../lib/auth');
const {getUser, isvalidatedUser, updateToken, updateValidated, updateTypeUser} = require('../lib/user.functions');
const {verifyMail} = require('../lib/emailer');
const helpers = require('../lib/helpers');


router.get('/homepage', isNotLoggedIn, authenticationController.renderHomePage);
router.get('/signin', authenticationController.renderSingIn);
router.get('/signup', authenticationController.renderSingUp);


router.post('/signup', authenticationController.singUp);
router.post('/signin', authenticationController.signIn);





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


module.exports = router;