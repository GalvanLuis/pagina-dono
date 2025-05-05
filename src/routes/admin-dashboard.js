const express = require('express');
const router = express.Router();
const {isAdmin, isLoggedIn} = require('../lib/auth');
const pool = require('../database/database');
const {readAdminSidebar} = require('../lib/helpers');


const CURRENT_TAB = "Inicio"

router.get('/', isLoggedIn, isAdmin, async (req, res) => {
    let adminNav = true;

    let adminSidebar = readAdminSidebar('./src/configs/admin-sidebar.json', CURRENT_TAB);

    res.render('links/admin_home', {adminNav, homePage: false, sidebars: true, adminSidebar})
})

module.exports = router;