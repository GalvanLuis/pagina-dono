const express = require('express');
const router = express.Router();
const {isTeacher, isLoggedIn} = require('../lib/auth');
const pool = require('../database/database');
const {readTeacherSidebar} = require('../lib/helpers');


const CURRENT_TAB = "Inicio"

router.get('/', isLoggedIn, isTeacher, async (req, res) => {
    let teacherNav = true;

    let teacherSidebar = readTeacherSidebar('./src/configs/teacher-sidebar.json', CURRENT_TAB);

    res.render('links/teacher_home', {teacherNav, homePage: false, sidebars: true, teacherSidebar})
})

module.exports = router;