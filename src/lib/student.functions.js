const pool = require('../database/database');
const {getSubscription} = require('./user.functions');


//const createStudent = async ()

const getClassrooms = async (id_alumno) => {
    let classrooms = await pool.query('SELECT id_classroom FROM alumnos_classroom WHERE id_alumno = ?;', [id_alumno]);
    if(classrooms.lenght > 0) return classrooms;
    else return null;
};

/**
 * Obtiene la informacion util del alumno
 * @param {string} id_stripe - no debe ir cifrado
 * @param {int} id_alumno
 * @returns {object}
 */
const getStudentData = async (id_stripe, id_alumno) => {
    data = {}
    
    let subs = await getSubscription(id_stripe);
    if(subs) data.subscribe = subs;

    let classrooms = await getClassrooms(id_alumno);
    if(classrooms) data.classrooms = classrooms;

    return data;
};


module.exports = {
    getStudentData
}