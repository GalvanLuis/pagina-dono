const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../lib/auth');

router.get('/', isLoggedIn, async (req,res) => {
    console.log("estoy en logged")
    res.render('links/home',{mesagge: req.flash('mesagge')});
});

module.exports = router;