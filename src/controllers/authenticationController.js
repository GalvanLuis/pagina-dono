const authenticationService = require('../services/authenticationServices');


const renderHomePage = (req, res) => {
    const {navbar} = authenticationService.renderHomePage();
    res.status(200).render('auth/homepage', {navbar});
};

const renderSingIn = (req, res) => {
    const {navbar} = authenticationService.renderSingIn();
    res.status(200).render('auth/signin', {navbar});
};

const renderSingUp = (req, res) => {
    const {navbar} = authenticationService.renderSingUp();
    res.status(200).render('auth/signup', {navbar});
};

const singUp = (req, res) => {
    authenticationService.singUp(req, res);
};

const signIn = (req,res,next) =>{
    authenticationService.signIn(req, res, next);
};

module.exports = {
    renderHomePage,
    renderSingIn,
    renderSingUp,
    singUp,
    signIn
}