// const pool = require('../database');
const { use } = require('passport');
const {STRIPE_PRIVATE_KEY, STRIPE_KEY, STRIPE_IV, ID_USUARIO, ID_ALUMNO, ID_ADMIN, ID_MAESTRO} = require('../config');
const stripe = require('stripe')(STRIPE_PRIVATE_KEY);
const {decryptData} = require('../lib/helpers');

module.exports = {

    isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        else{
            return res.redirect('/homepage');
        }
    },

    isNotLoggedIn(req,res,next){
        if(!req.isAuthenticated()){
            return next();
        } 
        else{
            return res.redirect('/home');
        }
    },

    isVerified(req,res,next){
        if(req.user.validado == 0){
            return res.redirect('/verification');
        } 
        else {
            return next();
        }
    },

    isUser(req, res, next){
        if(req.user.id_tipo_usuario == ID_USUARIO){
            return next();
        }
        else{
            return res.redirect('/redirect');
        }
    },

    isAdmin(req, res, next){
        if(req.user.id_tipo_usuario == ID_ADMIN){
            return next();
        }
        else{
            return res.redirect('/redirect');
        }
    },

    isTeacher(req, res, next){
        if(req.user.id_tipo_usuario == ID_MAESTRO){
            return next();
        }
        else{
            return res.redirect('/redirect');
        }
    },

    redirectUser(req, res, next){
        const user = req.user.id_tipo_usuario;
        if(user == ID_USUARIO || user == ID_ALUMNO) return res.redirect('/home');
        else if(user == ID_MAESTRO) return res.redirect('/teacher-dashboard');
        else if(user == ID_ADMIN) return res.redirect('/admin-dashboard');
    },

    async isSuscribed(req, res, next){
        let subscriptions = await stripe.subscriptions.list({
            customer: decryptData(STRIPE_KEY, STRIPE_IV, req.user.id_stripe),
            status: "active"
        });
        if (subscriptions.data.length > 0){
            return next();
        } else {
            return res.redirect('/plans');
        }
    }
};