const express = require('express');
const router = express.Router();
const {updateTypeUser, inserNewtStudent, existStudent, getIdTypeLevel} = require('../lib/user.functions');
const pool = require('../database/database');
const {isLoggedIn, isSuscribed} = require('../lib/auth');


router.get('/', isLoggedIn, isSuscribed, async (req, res, next) => {
    await updateTypeUser(req.user.id_usuario, 2);

    if(!await existStudent(req.user.id_usuario)){
        await inserNewtStudent(1, req.user.id_usuario);
    }

    req.logIn(req.user, async (err) =>{
        if(err) return next(err);
        res.redirect('/home');
    });
    
    req.user.id_tipo_nivel = await getIdTypeLevel(req.user.id_usuario);
});

module.exports = router;