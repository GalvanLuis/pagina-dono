const navbarFunctions = require('../lib/navFunctions');
const passport = require('passport');
const {STRIPE_KEY, STRIPE_IV, PHONE_KEY, PHONE_IV, EMAIL_KEY, EMAIL_IV, ID_USUARIO, ID_ALUMNO, ID_MAESTRO, ID_ADMIN} = require('../config');


const renderHomePage = () => {
    const navbar = navbarFunctions.readNavbar('./src/configs/home-navbar.json');
    return {navbar};
};

const renderSingIn = () => {
    const navbar = navbarFunctions.readNavbar('./src/configs/home-navbar.json');
    return {navbar};
};

const renderSingUp = () => {
    const navbar = navbarFunctions.readNavbar('./src/configs/home-navbar.json');
    return {navbar};
};

const singUp = (req, res, next) => {
    passport.authenticate('local.signup', {
        // successRedirect:'/home',
        failureRedirect: '/signup',
        failureFlash: true,
        session: false
    })(req, res, () => {
        res.redirect("/home");
    });
};

const signIn = (req, res, next) => {
    passport.authenticate('local.signin',{
        // successRedirect: '/user_type',
        failureRedirect:'/signin',
        failureFlash: true,
    })(req, res, () => {
        if      (req.user.id_tipo_usuario == ID_USUARIO) res.redirect("/home");
        else if (req.user.id_tipo_usuario == ID_ALUMNO) res.redirect("/home");
        else if (req.user.id_tipo_usuario == ID_MAESTRO) res.redirect("/teacher/dashboard")
        else if (req.user.id_tipo_usuario == ID_ADMIN) res.redirect("/admin/dashboard");
    });
};

module.exports = {
    renderHomePage,
    renderSingIn,
    renderSingUp,
    singUp,
    signIn
}