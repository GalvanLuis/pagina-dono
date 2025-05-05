const pool = require('../database/database');
const {getTypeUser, userDataToText} = require('./user.functions');
const {decryptData} = require('../lib/helpers');

const {
    STRIPE_KEY, 
    STRIPE_IV, 
    PHONE_KEY, 
    PHONE_IV, 
    EMAIL_KEY, 
    EMAIL_IV,
    ID_ALUMNO,
    ID_MAESTRO,
    ID_ADMIN,
    ID_USUARIO
} = require('../config');

/**
 * 
 * @param {Object} id_type_user Lista con los ids de los tipos de usuarios a buscar
 * @returns {Object}
 */
const getAllUsersData = async (id_type_user=null) => {
    let data = {};
    let id_tipo_usuario = null;
    let query = "SELECT * FROM idTipoUsuario"

    if(id_type_user != null){
        const placeholders = id_type_user.map(() => '?').join(', ');
        query += ` WHERE id_tipo_usuario IN (${placeholders});`
    }
    id_tipo_usuario = await pool.query(query, [id_type_user]);
    
    for(let type of id_tipo_usuario){
        let users = await pool.query("SELECT * FROM usuarios WHERE id_tipo_usuario = ?;", [type.id_tipo_usuario]);
        for(let user_i of users){
            user_i.id_stripe = decryptData(STRIPE_KEY, STRIPE_IV, user_i.id_stripe);
            user_i.telefono = decryptData(PHONE_KEY, PHONE_IV, user_i.telefono);
            user_i.correo_electronico = decryptData(EMAIL_KEY, EMAIL_IV, user_i.correo_electronico);
            user_i["tipo_usuario"] = await getTypeUser(user_i.id_tipo_usuario);
        }
        data[type.tipo_usuario] = users;
    }

    return data;
};

const getUserData = async (id_usuario) =>{
    const userData = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?;', [id_usuario]);
    return await userDataToText(userData[0]);
};

const getAdvancedUserData = async (user_data) => {
    const advancedUserData = {}

    if(user_data.id_tipo_usuario == ID_USUARIO){
        advancedUserData.usuario = true;
    }

    else if(user_data.id_tipo_usuario == ID_ALUMNO) {
        advancedUserData = await getStudentData(user_data.id_stripe, userId);
        advancedUserData.alumno = true;
    }
    
    else if(user_data.id_tipo_usuario == ID_MAESTRO) {
        advancedUserData = await getStudentData(user_data.id_stripe, userId);
        advancedUserData.maestro = true;
    }

    else if(user_data.id_tipo_usuario == ID_ADMIN) {
        advancedUserData.admin = true;
    }

    return advancedUserData;

};

const getTypeSubscriptions = async (atrributes=null) => {
    if(atrributes == null) atrributes = "*"
    return await pool.query('SELECT ' + atrributes + ' FROM idTipoSuscripcion;');
};

const getIDStripeSubscriptions = async (id) => {
    return await pool.query('SELECT id_product FROM idTipoSuscripcion WHERE id_tipo_suscripcion = ?', [id]);
};

const getAllPlans = async () => {
    return await pool.query('SELECT duracion_suscripcion, descripcion FROM Planes;');
};

module.exports = {
    getAllUsersData,
    getUserData,
    getAdvancedUserData,
    getTypeSubscriptions,
    getIDStripeSubscriptions,
    getAllPlans
};