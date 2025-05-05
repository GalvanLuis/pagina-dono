const {readTeacherSidebar} = require('../lib/helpers');
const teacherService = require('../services/teacherServices');
const {DOMAIN} = require('../config');

/** RENDER */
const renderDashboard = (req, res) => {
    const {teacherSidebar, navbar} = teacherService.renderDashboard();
    res.status(200).render('links/teachers/home', {teacherSidebar, navbar});
};

/** GET */

const getDashboard = (req, res) => {
    
};

module.exports = {
    renderDashboard,
    getDashboard
}