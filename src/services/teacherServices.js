const sidebarFunctions = require('../lib/sidebarFunctions');
const navbarFunctions = require('../lib/navFunctions');
const dbFunctions = require('../database/dbFunctions');
const criptFunctions = require('../lib/cryptFunctions');
const { DOMAIN, TEACHER_SIDEBAR_PATH, LOGGED_NAVBAR_PATH, IDS_USER_TYPE } = require('../config');
const { render } = require('timeago.js');



const renderDashboard = () => {
    const teacherSidebar = sidebarFunctions.readSidebar(TEACHER_SIDEBAR_PATH, "Inicio");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    return { teacherSidebar, navbar };
};

const renderClassroom = () => {
    const teacherSidebar = sidebarFunctions.readSidebar(TEACHER_SIDEBAR_PATH, "Salones");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    return { teacherSidebar, navbar };
};

// renderHomeworks

const renderHomeworks = () => {
    const teacherSidebar = sidebarFunctions.readSidebar(TEACHER_SIDEBAR_PATH, "Salones");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    return { teacherSidebar, navbar };
};

const renderaddHomework = () => {
    const teacherSidebar = sidebarFunctions.readSidebar(TEACHER_SIDEBAR_PATH, "Salones");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    return { teacherSidebar, navbar };
};

const renderEvaluations = () => {
    const teacherSidebar = sidebarFunctions.readSidebar(TEACHER_SIDEBAR_PATH, "Salones");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    return { teacherSidebar, navbar };
};

const renderFeedback = () => {
    const teacherSidebar = sidebarFunctions.readSidebar(TEACHER_SIDEBAR_PATH, "Salones");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    return { teacherSidebar, navbar };
};

// renderReports
const renderReports = () => {
    const teacherSidebar = sidebarFunctions.readSidebar(TEACHER_SIDEBAR_PATH, "Reportes");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    return { teacherSidebar, navbar };
};


module.exports = {
    renderDashboard,
    renderClassroom,
    renderHomeworks,
    renderaddHomework,
    renderEvaluations,
    renderReports,
    renderFeedback
};