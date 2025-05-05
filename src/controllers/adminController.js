const { readAdminSidebar } = require("../lib/helpers");
const adminService = require("../services/adminServices");
const { DOMAIN } = require("../config");

/** RENDER */
const renderDashboard = (req, res) => {
    const { adminSidebar, navbar } = adminService.renderDashboard();
    res.status(200).render("links/admin/home", { adminSidebar, navbar });
};

const renderUsers = async(req, res) => {
    const { adminSidebar, usersData, navbar, actualPage } =
    await adminService.renderUsers();
    console.log(usersData);
    res
        .status(200)
        .render("links/admin/users", {
            adminSidebar,
            usersData,
            navbar,
            actualPage,
        });
};

// Planes

const renderPlans = (req, res) => {
    const { adminSidebar, navbar } = adminService.renderPlans();
    const usersData = {
        Presencial: [{
                name: "Plan C1",
                price: 2000,
                duration: 3,
                description: "Plan de señas de nivel avanzado",
                id_plan: 1,
                id_tipo_plan: 1,
                date: "01/01/22",
                is_activated: true,
            },
            {
                name: "Plan A1",
                price: 3000,
                duration: 6,
                description: "Plan de señas de nivel principiante",
                id_plan: 2,
                id_tipo_plan: 1,
                date: "15/07/22",
                is_activated: false,
            },
        ],
        Remoto: [{
                name: "Plan C1",
                price: 2000,
                duration: 3,
                description: "Plan avanzado",
                id_plan: 1,
                id_tipo_plan: 2,
                date: "10/04/22",
                is_activated: false,
            },
            {
                name: "Plan B2",
                price: 3000,
                duration: 6,
                description: "Plan intermedio",
                id_plan: 2,
                id_tipo_plan: 2,
                date: "20/10/22",
                is_activated: true,
            },
        ],
        Autonomo: [],
    };
    const actualPage = DOMAIN + "admin/plans";
    console.log(usersData);
    res
        .status(200)
        .render("links/admin/plans", {
            adminSidebar,
            navbar,
            usersData,
            actualPage,
        });
};

const renderAddPlan = (req, res) => {
    const { adminSidebar, navbar } = adminService.renderAddPlan();
    res.status(200).render("links/admin/add-plan", { adminSidebar, navbar });
};

const renderEditPlan = (req, res) => {
    const { adminSidebar, navbar } = adminService.renderEditPlan();
    const usersData = {
        name: "Plan 2",
        price: 3000,
        duration: 6,
        description: "Plan 2",
        id_plan: 2,
        id_tipo_plan: 1,
        date: "15/07/22",
    };
    console.log(usersData);
    res
        .status(200)
        .render("links/admin/edit-plans", { adminSidebar, navbar, usersData });
};

// Salones

const renderClassroom = (req, res) => {
    const { adminSidebar, navbar } = adminService.renderClassroom();
    const usersData = {
        Presencial: [{
            classroom_name: "Salon 1",
            classroom_teacher: "Donovan Moche",
            progress: 60,
            num_students: 2,
            id_classroom: 1,
            id_tipo_plan: 1,
            class_schedule: "Lunes a Viernes 8:00 am - 12:00 pm",
            zoom_link: "https://classroom.google.com/c/MTU4NzQ4NjYwNjYz?cjc=7z7z7z7",
        }, ],
        Remoto: [],
        Autonomo: [{
            classroom_name: "Salon1",
            classroom_teacher: "Pablita",
            progress: 20,
            num_students: 3,
            id_classroom: 1,
            id_tipo_plan: 3,
            class_schedule: "Lunes a Viernes 6:00 pm - 8:00 pm",
            zoom_link: "https://us02web.zoom.us/j/1234567890",
        }, ],
    };
    const actualPage = DOMAIN + "admin/classrooms";
    res
        .status(200)
        .render("links/admin/classrooms", {
            adminSidebar,
            navbar,
            usersData,
            actualPage,
        });
};

const renderAddClassroom = (req, res) => {
    const { adminSidebar, navbar } = adminService.renderAddClassroom();
    res.status(200).render("links/admin/add-classroom", { adminSidebar, navbar });
};

const renderEditClassroom = (req, res) => {
    const { adminSidebar, navbar } = adminService.renderEditClassroom();
    const usersData = {
        classroom_name: "Salon 1",
        classroom_teacher: "Donovan Moche",
        class_schedule: "Lunes 3 am - 5",
        id_classroom: 1,
        id_tipo_plan: 1,
    };
    res
        .status(200)
        .render("links/admin/edit-classroom", { adminSidebar, navbar, usersData });
};

// Reportes

const renderReports = (req, res) => {
    const { adminSidebar, navbar } = adminService.renderReports();
    const usersData = {
        Presencial: [{
            report_Date: "01/01/22",
            id_classroom: "Salon 1",
            id_tipo_plan: 1,
            reported_teacher: "Donovan Moche",
            student_Name: "Garuda",
            student_mail: "yovanny@duck.com",
            report: "El profe no me ha mandado las rutas de estudio nuevas ademas que lo vieron en la calle con una mujer que no era su esposa",
            id_report: 1
        }, ],
        Remoto: [{
            report_Date: "01/01/22",
            id_classroom: "Salon 2",
            id_tipo_plan: 2,
            reported_teacher: "Pablita",
            student_Name: "Garuda",
            student_mail: "yovanny@duck.com",
            report: "El profe es Moreno",
            id_report: 2,
        }, ],
        Autonomo: [],
    };
    const actualPage = DOMAIN + "admin/reports";
    res
        .status(200)
        .render("links/admin/reports", { adminSidebar, navbar, usersData, actualPage });
};


// Pagos

const renderPayments = (req, res) => {
    const { adminSidebar, navbar } = adminService.renderPayments();
    const usersData = {
        Presencial: [{
                payment_Date: "01/01/22",
                id_classroom: "Salon 1",
                id_tipo_plan: 1,
                student_Name: "Garuda",
                payment: 2000,
                id_payment: 1,
            },
            {
                payment_Date: "01/02/22",
                id_classroom: "Salon 1",
                id_tipo_plan: 1,
                student_Name: "Garuda",
                payment: 3000,
                id_payment: 2,
            },
            {
                payment_Date: "01/03/22",
                id_classroom: "Salon 1",
                id_tipo_plan: 1,
                student_Name: "Garuda",
                payment: 3000,
                id_payment: 3,
            },
            {
                payment_Date: "01/04/22",
                id_classroom: "Salon 1",
                id_tipo_plan: 1,
                student_Name: "Garuda",
                payment: 3000,
                id_payment: 4,
            },
            {
                payment_Date: "01/05/23",
                id_classroom: "Salon 2",
                id_tipo_plan: 1,
                student_Name: "Taco",
                payment: 4000,
                id_payment: 23,
            },
            {
                payment_Date: "01/06/23",
                id_classroom: "Salon 2",
                id_tipo_plan: 1,
                student_Name: "Taco",
                payment: 4000,
                id_payment: 24,
            },
        ],
        Remoto: [{
                payment_Date: "01/01/22",
                id_classroom: "Salon 2",
                id_tipo_plan: 2,
                student_Name: "Garuda",
                payment: 2000,
                id_payment: 1,
            },
            {
                payment_Date: "01/02/22",
                id_classroom: "Salon 2",
                id_tipo_plan: 2,
                student_Name: "Garuda",
                payment: 3000,
                id_payment: 2,
            },
            {
                payment_Date: "01/03/22",
                id_classroom: "Salon 2",
                id_tipo_plan: 2,
                student_Name: "Garuda",
                payment: 3000,
                id_payment: 3,
            },
            {
                payment_Date: "01/04/22",
                id_classroom: "Salon 10",
                id_tipo_plan: 2,
                student_Name: "Garuda",
                payment: 3000,
                id_payment: 4,
            },
            {
                payment_Date: "02/05/23",
                id_classroom: "Salon 2",
                id_tipo_plan: 2,
                student_Name: "Taco",
                payment: 4000,
                id_payment: 23,
            },
            {
                payment_Date: "01/06/23",
                id_classroom: "Salon 2",
                id_tipo_plan: 2,
                student_Name: "Taco",
                payment: 4000,
                id_payment: 24,
            },
        ],
        Autonomo: [{
                payment_Date: "01/01/22",
                id_classroom: "Salon 1",
                id_tipo_plan: 3,
                student_Name: "Garuda",
                payment: 2000,
                id_payment: 1,
            },
            {
                payment_Date: "01/02/22",
                id_classroom: "Salon 1",
                id_tipo_plan: 3,
                student_Name: "Garuda",
                payment: 3000,
                id_payment: 2,
            },
            {
                payment_Date: "01/03/22",
                id_classroom: "Salon 1",
                id_tipo_plan: 3,
                student_Name: "Garuda",
                payment: 3000,
                id_payment: 3,
            },
            {
                payment_Date: "01/04/22",
                id_classroom: "Salon 1",
                id_tipo_plan: 3,
                student_Name: "Garuda",
                payment: 3000,
                id_payment: 4,
            },
            {
                payment_Date: "01/05/23",
                id_classroom: "Salon 2",
                id_tipo_plan: 3,
                student_Name: "Taco",
                payment: 4000,
                id_payment: 23,
            },
            {
                payment_Date: "01/06/23",
                id_classroom: "Salon 2",
                id_tipo_plan: 3,
                student_Name: "Taco",
                payment: 4000,
                id_payment: 24,
            },
        ],
    };
    res
        .status(200)
        .render("links/admin/payments", { adminSidebar, navbar, usersData });
};

////////////////////////////

const renderEditUser = async(req, res) => {
    const { adminSidebar, navbar, userData } = await adminService.renderEditUser(
        req.query.id,
    );
    res
        .status(200)
        .render("links/admin/edit-user", { adminSidebar, navbar, userData });
};

const renderCreateUser = async(req, res) => {
    const { adminSidebar, navbar, usersData, actualPage, userType } =
    await adminService.renderCreateUser(req.query.ut);
    res
        .status(200)
        .render("links/admin/add", {
            adminSidebar,
            navbar,
            usersData,
            actualPage,
            userType,
        });
};

const renderCancel = async(req, res) => {
    const { adminSidebar, navbar } = await adminService.renderCancel();
    res.render("links/admin/cancel", { adminSidebar, navbar });
};

/** CREATE */

const createNewUser = async(req, res) => {
    const userData = req.body;
    //const newUser = await userFunctions.createUser(userData.name, userData.last_name, userData.num_phone, userData.email, userData.pass);
    //userFunctions.insertNewUser(newUser);
    res.redirect("/admin-users");
};

/** UPDATE */
const updateOneUser = async(req, res) => {
    const idUsuario = req.query.id;
    const userType = req.query.ut;
    const user = await getUserData(id_usuario);
    const update = await userFunctions.updateUser(
        user,
        req.body.name,
        req.body.last_name,
        req.body.phone,
        req.body.email,
        Number(req.body.validated),
    );
    if (!update) req.flash("message", "Hubo un error al actualizar los datos");
    else req.flash("succes", "El usuario se ha actualizado con exito");
    res.redirect("/admin-users");
};

/** GET */
const getDashboard = (req, res) => {};

const getUsers = (req, res) => {};

const getPlans = async(req, res) => {
    // let adminSidebar = readAdminSidebar('./admin-sidebar.json', CURRENT_TAB);
    // const typeSubscriptions = await getTypeSubscriptions();
    // const plans = await getAllPlans();
    // console.log(plans)
    // res.status(202).render('links/admin-plans', {adminNav: true, adminSidebar, typeSubscriptions, plans});
    res.send("ok");
};

const getAddPlan = async(req, res) => {
    //const sub_response = await createSubscription("Virtual", 2);
    //const price_response = await createPrice(sub_response.id, 2000, 3);

    //res.send(await createSession(req.user.id_stripe, price_response.id));
    const id_plan = req.params.id_plan;
    let adminSidebar = readAdminSidebar("./admin-sidebar.json", CURRENT_TAB);
    res.render("links/admin-plans_add-plan", {
        adminNav: true,
        adminSidebar,
        id_plan,
    });
};

const createNewPlan = async(req, res) => {
    const body = req.body;
    const stripe_id = await getIDStripeSubscriptions(body.type_plan);
    await createPlan(
        stripe_id[0].id_product,
        body.price,
        body.duration,
        body.description,
        body.type_plan,
    );
    res.redirect("/admin-plans");
};

const createNewSubscription = async(req, res) => {
    const { name_subscription } = req.body;
    await createSubscription(name_subscription);
    res.redirect("/admin-plans");
};

const getAllUsers = async(req, res) => {
    let adminNav = true;
    let adminSidebar = readAdminSidebar("./admin-sidebar.json", CURRENT_TAB);
    let userData = await getAllUsersData();
    res.render("links/admin-users", { adminNav, adminSidebar, userData });
};

const getUpdateOneUser = async(req, res) => {
    const userId = req.query.id;
    let adminSidebar = readAdminSidebar("./admin-sidebar.json", CURRENT_TAB);
    let userData = await getUserData(userId);
    let advancedUserData = await getAdvancedUserData(userData);
    res.render("links/admin-users_edit-user", {
        adminNav: true,
        adminSidebar,
        userData,
        advancedUserData,
    });
};

const deleteOneUser = async(req, res) => {
    const id_usuario = req.query.id;
    const user = await getUserData(id_usuario);
    userFunctions.deleteUser(user);
    res.redirect("/admin-users");
};

const getCreateNewUser = async(req, res) => {
    let adminSidebar = readAdminSidebar("./admin-sidebar.json", CURRENT_TAB);
    res.render("links/admin-users_add-user", { adminNav: true, adminSidebar });
};

const getCreateNewStudent = async(req, res) => {
    let adminSidebar = readAdminSidebar("./admin-sidebar.json", CURRENT_TAB);
    let userData = await getAllUsersData([1]);
    res.render("links/admin-users_add-student", {
        adminNav: true,
        adminSidebar,
        userData,
    });
};

const createNewStudent = async(req, res) => {
    const id_usuario = req.query.id;
    const user = await getUserData(id_usuario);
    res.redirect("/admin-users");
};

const getConfirmStudent = async(req, res) => {
    const id_usuario = req.query.id;
    const userData = await getUserData(id_usuario);
    let adminSidebar = readAdminSidebar("./admin-sidebar.json", CURRENT_TAB);
    res.render("links/admin-users_confirm-student", {
        adminNav: true,
        adminSidebar,
        userData,
    });
};

module.exports = {
    renderDashboard,
    renderUsers,
    renderEditUser,
    renderCreateUser,
    renderCancel,
    renderPlans,
    renderEditPlan,
    renderClassroom,
    renderAddClassroom,
    renderEditClassroom,
    renderAddPlan,
    renderReports,
    //renderReportMotive,
    renderPayments,
    getDashboard,
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
    getConfirmStudent,
};