const sidebarFunctions = require('../lib/sidebarFunctions');
const navbarFunctions = require('../lib/navFunctions');
const dbFunctions = require('../database/dbFunctions');
const criptFunctions = require('../lib/cryptFunctions');
const {DOMAIN, TEACHER_SIDEBAR_PATH, LOGGED_NAVBAR_PATH, IDS_USER_TYPE} = require('../config');
const { render } = require('timeago.js');


const renderDashboard = () => {
    const teacherSidebar = sidebarFunctions.readSidebar(TEACHER_SIDEBAR_PATH,  "Inicio");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    return {teacherSidebar, navbar};
};


module.exports = {
    renderDashboard
}
