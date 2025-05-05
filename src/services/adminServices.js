const sidebarFunctions = require('../lib/sidebarFunctions');
const navbarFunctions = require('../lib/navFunctions');
const dbFunctions = require('../database/dbFunctions');
const criptFunctions = require('../lib/cryptFunctions');
const { DOMAIN, ADMIN_SIDEBAR_PATH, LOGGED_NAVBAR_PATH, IDS_USER_TYPE } = require('../config');
const { render } = require('timeago.js');



const renderDashboard = () => {
    const adminSidebar = sidebarFunctions.readSidebar(ADMIN_SIDEBAR_PATH, "Inicio");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    return { adminSidebar, navbar };
};

const renderUsers = async() => {
    const columns_to_show = ["id_usuario", "nombre", "apellido", "correo_electronico", "fecha_creado"];
    const usersTask = getAllUsersByUsersType(null, columns_to_show);
    const adminSidebar = sidebarFunctions.readSidebar(ADMIN_SIDEBAR_PATH, "Usuarios");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    const usersData = await usersTask
    const actualPage = DOMAIN + 'admin/users'
    return { adminSidebar, usersData, navbar, actualPage };
};

// Planes

const renderPlans = () => {
    const adminSidebar = sidebarFunctions.readSidebar(ADMIN_SIDEBAR_PATH, "Planes");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    return { adminSidebar, navbar };
};

const renderEditPlan = () => {
    const adminSidebar = sidebarFunctions.readSidebar(ADMIN_SIDEBAR_PATH, "Planes");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    return { adminSidebar, navbar };
};

const renderAddPlan = () => {
    const adminSidebar = sidebarFunctions.readSidebar(ADMIN_SIDEBAR_PATH, "Planes");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    return { adminSidebar, navbar };
};

// Aulas

const renderClassroom = () => {
    const adminSidebar = sidebarFunctions.readSidebar(ADMIN_SIDEBAR_PATH, "Salones");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    return { adminSidebar, navbar };
};

const renderAddClassroom = () => {
    const adminSidebar = sidebarFunctions.readSidebar(ADMIN_SIDEBAR_PATH, "Aulas");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    return { adminSidebar, navbar };
};

const renderEditClassroom = () => {
    const adminSidebar = sidebarFunctions.readSidebar(ADMIN_SIDEBAR_PATH, "Aulas");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    return { adminSidebar, navbar };
};


// Reportes
const renderReports = () => {
    const adminSidebar = sidebarFunctions.readSidebar(ADMIN_SIDEBAR_PATH, "Reportes");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    return { adminSidebar, navbar };
};

// Pagos
const renderPayments = () => {
    const adminSidebar = sidebarFunctions.readSidebar(ADMIN_SIDEBAR_PATH, "Pagos");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    return { adminSidebar, navbar };
};

// Calendario de actividades
const renderSchedule = () => {
    const adminSidebar = sidebarFunctions.readSidebar(ADMIN_SIDEBAR_PATH, "Calendario de actividades");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    return { adminSidebar, navbar };
};

const renderEditUser = async(user_id) => {
    const userDataTask = getOneUser(user_id);
    const adminSidebar = sidebarFunctions.readSidebar(ADMIN_SIDEBAR_PATH, "Usuarios");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    const userData = await userDataTask;
    return { adminSidebar, userData, navbar, };
};

const renderCreateUser = async(user_type) => {
    const actualPage = DOMAIN + 'admin/users/add';
    let typesUsers = null;
    if (user_type == 2) typesUsers = [1];
    else if (user_type == 3) typesUsers = [1, 2];
    else if (user_type == 4) typesUsers = [1, 2, 3];

    if (user_type != '1') {
        const columns_to_show = ["id_usuario", "nombre", "apellido", "correo_electronico", "fecha_creado"];
        const usersTask = getAllUsersByUsersType(typesUsers, columns_to_show);
        const adminSidebar = sidebarFunctions.readSidebar(ADMIN_SIDEBAR_PATH, "Usuarios");
        const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
        const usersData = await usersTask;
        return { adminSidebar, navbar, usersData, actualPage, userType: user_type };
    } else {
        const adminSidebar = sidebarFunctions.readSidebar(ADMIN_SIDEBAR_PATH, "Usuarios");
        const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
        return { adminSidebar, navbar, actualPage, userType: user_type };
    }
};

const renderCancel = () => {
    const adminSidebar = sidebarFunctions.readSidebar(ADMIN_SIDEBAR_PATH, "Inicio");
    const navbar = navbarFunctions.readNavbar(LOGGED_NAVBAR_PATH);
    return { adminSidebar, navbar };
}

const getOneUser = async(user_id) => {
    const user = await dbFunctions.getOneUser(user_id);
    const userData = await criptFunctions.decryptOneUserData(user[0]);
    return userData
};

const getAllUsers = (user_type = null, columns = null) => {
    return
};

const getAllUsersByUsersType = async(types_users = null, columns = null) => {
    if (!types_users) types_users = IDS_USER_TYPE;

    let userTypeColumns = {};
    for (let userType of types_users)
        userTypeColumns[userType] = columns;

    const users = await dbFunctions.getUsersByUserType(userTypeColumns);
    const usersData = await criptFunctions.decryptUsersDataFromDB(users, id_to_name = true);
    return usersData
};

//const createNewUser =

const getPlans = () => {
    return
};

const getAddPlan = () => {
    return
};

const createNewPlan = () => {
    return
};

const createNewSubscription = () => {
    return
};


const getUpdateOneUser = () => {
    return
};

const updateOneUser = async(user_id, new_name = null, new_last_name = null, new_phone = null, new_email = null, new_password = null, new_validated = null) => {
    const userData = await getOneUser(user_id);
    let data_to_update = { id_usuario: userData.id_usuario };

    if (new_name && new_name != userData.nombre) {
        data_to_update.nombre = new_name;
    }
    if (new_last_name && new_last_name != userData.apellido) {
        data_to_update.apellido = new_last_name;
    }
    if (new_phone && new_phone != userData.telefono) {
        data_to_update.telefono = new_phone;
    }
    if (new_email && new_email != userData.correo_electronico) {
        data_to_update.correo_electronico = new_email;
    }
    if (new_password && criptFunctions.matchPassword(new_password, userData.contrasena)) {
        data_to_update.contrasena = new_password;
    }
    if (new_validated && new_validated != userData.validado) {
        data_to_update.validado = new_validated
    }




    return
};

const deleteOneUser = () => {
    return
};

const getCreateNewUser = () => {
    return
};

const createNewUser = () => {
    return
};

const getCreateNewStudent = () => {
    return
};

const createNewStudent = () => {
    return
};

const getConfirmStudent = () => {
    return
};



module.exports = {
    renderDashboard,
    renderUsers,
    renderEditUser,
    renderCreateUser,
    renderCancel,
    renderPlans,
    renderEditPlan,
    renderAddPlan,
    renderClassroom,
    renderAddClassroom,
    renderEditClassroom,
    renderReports,
    renderSchedule,
    renderPayments,
    getPlans,
    getAddPlan,
    createNewPlan,
    createNewSubscription,
    getAllUsers,
    getUpdateOneUser,
    updateOneUser,
    deleteOneUser,
    getCreateNewUser,
    createNewUser,
    getCreateNewStudent,
    createNewStudent,
    getConfirmStudent
}