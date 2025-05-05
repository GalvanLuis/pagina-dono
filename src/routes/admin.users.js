const express = require('express');
const router = express.Router();
const {isAdmin, isLoggedIn} = require('../lib/auth');
const pool = require('../database/database');
const {readAdminSidebar, encryptData} = require('../lib/helpers');
const {getAllUsersData, getUserData, getAdvancedUserData} = require('../lib/admin.functions')
const { getStudentData } = require('../lib/student.functions');
const userFunctions = require('../lib/user.functions');


const CURRENT_TAB = "Usuarios"

router.get('/', isLoggedIn, isAdmin, async (req, res) => {
    let adminNav = true;
    let adminSidebar = readAdminSidebar('./admin-sidebar.json', CURRENT_TAB);
    let userData = await getAllUsersData();
    res.render('links/admin-users', {adminNav, adminSidebar, userData});
});

router.get('/edit-user', isLoggedIn, isAdmin, async (req, res) =>{
    const userId = req.query.id;
    let adminSidebar = readAdminSidebar('./admin-sidebar.json', CURRENT_TAB);
    let userData = await getUserData(userId);
    let advancedUserData = await getAdvancedUserData(userData);
    res.render('links/admin-users_edit-user', {adminNav: true, adminSidebar, userData, advancedUserData});
});

router.post('/edit-user/:id', isLoggedIn, isAdmin, async (req, res) => {
    const id_usuario = req.params.id;
    const user = await getUserData(id_usuario);
    const update = await userFunctions.updateUser(user, req.body.name, req.body.last_name, req.body.phone, req.body.email, Number(req.body.validated));
    if(!update) req.flash("message", "Hubo un error al actualizar los datos");
    else req.flash("succes", "El usuario se ha actualizado con exito");
    res.redirect('/admin-users');
});

router.post('/delete-user', isLoggedIn, isAdmin, async (req, res) => {
    const id_usuario = req.query.id;
    const user = await getUserData(id_usuario);
    userFunctions.deleteUser(user);
    res.redirect('/admin-users');
});

router.get('/add-usuario', isLoggedIn, isAdmin, async (req, res) => {
    let adminSidebar = readAdminSidebar('./admin-sidebar.json', CURRENT_TAB);
    res.render('links/admin-users_add-user', {adminNav: true, adminSidebar});
});

router.post('/add-usuario', isLoggedIn, isAdmin, async (req, res) => {
    const userData = req.body;
    const newUser = await userFunctions.createUser(userData.name, userData.last_name, userData.num_phone, userData.email, userData.pass);
    userFunctions.insertNewUser(newUser);
    res.redirect('/admin-users');
});

router.get('/add-alumno', isLoggedIn, isAdmin, async (req, res) => {
    let adminSidebar = readAdminSidebar('./src/configs/admin-sidebar.json', CURRENT_TAB);
    let userData = await getAllUsersData([1]);
    res.render('links/admin-users_add-student', {adminNav: true, adminSidebar, userData});
});

router.post('/add-alumno', isLoggedIn, isAdmin, async (req, res) => {
    const id_usuario = req.query.id;
    const user = await getUserData(id_usuario);
    res.redirect('/admin-users');
});

router.get('/confirm-student', isLoggedIn, isAdmin, async (req, res) => {
    const id_usuario = req.query.id;
    const userData = await getUserData(id_usuario);
    let adminSidebar = readAdminSidebar('./src/configs/admin-sidebar.json', CURRENT_TAB);
    res.render('links/admin-users_confirm-student', {adminNav: true, adminSidebar, userData})
});

module.exports = router;