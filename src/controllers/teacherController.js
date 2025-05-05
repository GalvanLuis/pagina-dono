const { readTeacherSidebar } = require('../lib/helpers');
const teacherService = require('../services/teacherServices');
const { DOMAIN } = require('../config');
const { classroom_to_id } = require('../lib/handlebars');
const { use } = require('passport');

/** RENDER */
const renderDashboard = (req, res) => {
    const { teacherSidebar, navbar } = teacherService.renderDashboard();
    res.status(200).render('links/teachers/home', { teacherSidebar, navbar });
};

// Render students

const renderClassroom = (req, res) => {
    const { teacherSidebar, navbar } = teacherService.renderClassroom();
    const usersData = {
        Presencial: [
            {
                id_tipo_plan: 1,
                id_classroom: 1,
                classroom_name: "Salon 1",
                student_number: 2,
                classroom_progress: 50,
                classroom_schedule: "Lunes a Viernes 8:00 - 10:00",
                classroom_location: "Casa de Juan Perez"
            },
            {
                id_tipo_plan: 1,
                id_classroom: 2,
                classroom_name: "Salon 2",
                student_number: 1,
                classroom_progress: 22,
                classroom_schedule: "Lunes a Viernes 1:00 - 2:00",
                classroom_location: "Casa de Maria Lopez"
            }
        ],
        Remoto: [
        ],
        Autonomo: [
            {
                id_tipo_plan: 3,
                id_classroom: 1,
                classroom_name: "Salon 1",
                student_number: 2,
                classroom_progress: 76,
                classroom_schedule: "Lunes a Viernes 8:00 - 10:00",
                classroom_location: "Zoom URL: https://zoom.us/j/1234567890"
            },
            {
                id_tipo_plan: 3,
                id_classroom: 2,
                classroom_name: "Salon 2",
                student_number: 1,
                classroom_progress: 1,
                classroom_schedule: "Lunes a Viernes 1:00 - 2:00",
                classroom_location: "Zoom URL: https://zoom.us/j/1234567890"
            },
            {
                id_tipo_plan: 3,
                id_classroom: 3,
                classroom_name: "Salon 3",
                student_number: 2,
                classroom_progress: 30,
                classroom_schedule: "Lunes a Viernes 8:00 - 10:00",
                classroom_location: "Zoom URL: https://zoom.us/j/1234567890"
            }
        ]
    };
    const actualPage = DOMAIN + "teacher/classroom";
    res.status(200).render('links/teacher/classroom', { teacherSidebar, navbar, usersData, actualPage });
};

// Render homeworks

const renderHomeworks = (req, res) => {
    const { teacherSidebar, navbar } = teacherService.renderHomeworks();
    const usersData = {
        Alumnos: [{
                id_student: 1,
                student_name: "Juan Perez",
                student_age: 15,
                student_grade: "10th Grade",
                student_email: "juan.perez@example.com",
            },
            {
                id_student: 2,
                student_name: "Maria Lopez",
                student_age: 16,
                student_grade: "11th Grade",
                student_email: "maria.lopez@example.com",
            }
        ]
    };
    const hwData = {
        Tareas: [{
                id_homework: 1,
                homework_name: "Tarea 1",
                homework_description: "Hacer la tarea 1",
                homework_due_date: "2021-06-01",
                homework_status: "Pendiente"
            },
            {
                id_homework: 2,
                homework_name: "Tarea 2",
                homework_description: "Hacer la tarea 2",
                homework_due_date: "2021-06-02",
                homework_status: "Pendiente",
            }
        ]
    };

    const examData = {
        Examenes: [{
                id_exam: 1,
                exam_name: "Examenes aula 1",
                exam_description: "Hacer el examen 1",
                exam_due_date: "2021-06-01",
                exam_status: "Pendiente"
            },
            {
                id_exam: 2,
                exam_name: "Examenes aula 2",
                exam_description: "Hacer el examen 2",
                exam_due_date: "2021-06-02",
                exam_status: "Pendiente",
            }
        ]
    };
    const actualPage = DOMAIN + "teacher/classroom/homeworks";
    res.status(200).render('links/teacher/homeworks', { teacherSidebar, navbar, usersData, hwData, examData, actualPage });
};

const renderaddHomework = (req, res) => {
    const { teacherSidebar, navbar } = teacherService.renderaddHomework();
    res.status(200).render('links/teacher/add-homework', { teacherSidebar, navbar });
};

const renderEvaluations = (req, res) => {
    const { teacherSidebar, navbar } = teacherService.renderEvaluations();
const hwTask = {
    Tarea: [{
        id_homework: 1,
        homework_name: "Tarea 2",
        homework_description: "Hacer la tarea 2 del libro de LSM",
        homework_due_date: "2021-06-02",
        homework_status: "Pendiente",
    }]
};
    const usersData = {
        Alumnos: [{
                id_student: 1,
                student_Name: "Juan Perez",
                homework_delivered_date: "2021-06-01",
                homework_status: "Entregado",
                homework_grade: 10,
                homework_link: "https://google.com"
            },
            {
                id_student: 2,
                student_Name: "Maria Lopez",
                homework_delivered_date: "2021-06-02",
                homework_status: "Entregado",
                homework_grade: 9,
                homework_link: "https://yahoo.com"
            }
        ]
    };
    const actualPage = DOMAIN + "teacher/classroom/homeworks/evaluation";
    res.status(200).render('links/teacher/evaluation', { teacherSidebar, navbar, hwTask, usersData, actualPage });
};

// Render reports
const renderReports = (req, res) => {
    const { teacherSidebar, navbar } = teacherService.renderReports();
    const usersData = {
        Presencial: [{
            student_id: 1,
            report_Date: "01/01/22 11:52 AM",
            id_classroom: "Salon 1",
            id_tipo_plan: 1,
            reported_teacher: "Donovan Moche",
            student_Name: "Garuda",
            student_email: "yovanny@duck.com",
            report: "El profe no me ha mandado las rutas de estudio nuevas ademas que lo vieron en la calle con una mujer que no era su esposa",
            student_attachment: "https://www.google.com",
            id_report: 1
        },
        {
            student_id: 2,
            report_Date: "01/02/22 11:55 AM" ,
            id_classroom: "Salon 1",
            id_tipo_plan: 1,
            reported_teacher: "Donovan Moche",
            student_Name: "Tomas",
            student_email: "asjdfa@gmail.com",
            report: "El profe es Racista",
            student_attachment: "https://www.yahoo.com",
            id_report: 2
        }
        ],
        Remoto: [{
            student_id: 1,
            report_Date: "01/01/22 11:56 AM",
            id_classroom: "Salon 2",
            id_tipo_plan: 2,
            reported_teacher: "Pablita",
            student_Name: "Garuda",
            student_email: "yovanny@duck.com",
            report: "El profe es Moreno",
            student_attachment: "https://www.start.me", 
            id_report: 3
        } 
    ],
        Autonomo: [],
    };
    const actualPage = DOMAIN + "teacher/reports";
    res
        .status(200)
        .render("links/teacher/reports", { teacherSidebar, navbar, usersData, actualPage });
};

const renderFeedback = (req, res) => {
    const { teacherSidebar, navbar } = teacherService.renderFeedback();
    res.status(200).render('links/teacher/feedback', { teacherSidebar, navbar });
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