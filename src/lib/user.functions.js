const {STRIPE_PRIVATE_KEY, STRIPE_KEY, STRIPE_IV, PHONE_KEY, PHONE_IV, EMAIL_KEY, EMAIL_IV} = require('../config')
const pool = require('../database/database');
const helpers = require('./helpers');
const { v4: uuidv4 } = require('uuid');
const {verifyMail} = require('./emailer');
const {updateCustomer, createCustomer, deleteCustomer} = require('./stripe.customers');
const stripe = require('stripe')(STRIPE_PRIVATE_KEY);

/**
 * Crea un objeto con la informacion del usuario.
 * Ningun parametro de esta funcion debe ir cifrado
 * o encriptado.
 * @param {string} nombre - Nombre(s) del Usuario
 * @param {string} apellido - Apellido(s) del Usuario
 * @param {string} telefono - Telefono del Usuario
 * @param {string} correo_electronico - Email del Usuario
 * @param {string} contrasenha - Contraseña del Usuario
 * @returns {object} - Objecto con los datos del Usuario 
 */
const createUser = async (nombre, apellido, telefono, correo_electronico, contrasenha) => {
    const customer = await createCustomer({
        email: correo_electronico,
        phone: telefono,
        name: nombre + ' ' + apellido
    });

    const newUser = {
        id_stripe: helpers.encryptStripeId(customer.id),
        nombre: nombre,
        apellido: apellido,   
        telefono: helpers.encryptPhone(telefono),
        correo_electronico: helpers.encryptEmail(correo_electronico),
        contrasenha: await helpers.encryptPassword(contrasenha),
        token: uuidv4(),
        id_tipo_usuario: 1
    }
    return newUser;
};


const updateUser = async (user, new_name=null, new_last_name=null, new_phone=null, new_email=null, new_validated=null) => {
    let update_stripe = {};
    let update_name = '';

    if(new_email && new_email != user.correo_electronico){
        new_email = helpers.encryptEmail(new_email);
        if(await existEmail(new_email, false)) return false; // no puedes poner a 2 usuarios el mismo correo electronico
        updateEmail(user.id_usuario, new_email, false);
        update_stripe.email = new_email;
    } else new_email = user.correo_electronico;

    if(new_name && new_name != user.nombre){
        updateName(user.id_usuario, new_name);
        update_name = new_name + ' ';
    } else update_name = user.nombre + ' ';

    if(new_last_name && new_last_name != user.apellido){
        updateLastName(user.id_usuario, new_last_name);
        update_name += new_last_name;
    } else update_name += user.apellido;

    if(new_phone && new_phone != user.telefono){
        updatePhone(user.id_usuario, new_phone);
        update_stripe.phone = new_phone;
    }

    if(new_validated != null && new_validated != user.validado){
        updateValidated(user.id_usuario, new_validated);
        if(new_validated) updateToken(user.id_usuario, '');
        else {
            updateToken(user.id_usuario, uuidv4());
            verifyMail(user, "SAS <sas@test.com>", new_email);
        }
    }

    update_stripe.name = update_name;
    if(Object.keys(update_stripe).length != 0) updateCustomer(user.id_stripe, update_stripe);
    return true;
};


const deleteUser = async (user) => {
    deleteCustomer(user.id_stripe);
    return pool.query('DELETE FROM usuarios WHERE id_usuario = ?;', [user.id_usuario]);
};

/**
 * Inserta el usuario a la base de datos
 * @param {object} newUser - Informacion del usuario
 * @returns la fila agregada a la base de datos
 */
const insertNewUser = async (newUser) => {
    let result = await pool.query('INSERT INTO usuarios SET ?;', [newUser]);
    return result;
};


const userDataToText = async (userData) => {
    userData.id_stripe = helpers.decryptData(STRIPE_KEY, STRIPE_IV, userData.id_stripe);
    userData.telefono = helpers.decryptData(PHONE_KEY, PHONE_IV, userData.telefono);
    userData.correo_electronico = helpers.decryptData(EMAIL_KEY, EMAIL_IV, userData.correo_electronico);
    userData["tipo_usuario"] = await getTypeUser(userData.id_tipo_usuario);
    return userData;
};

const getUser = async (id_ususario) => {
    let user = await pool.query('SELECT * from usuarios WHERE id_usuario = ?;',[id_ususario]);
    return user;
};


const existUser = async (id_ususario) => {
    let user = await pool.query('SELECT * from usuarios WHERE id_usuario = ?;',[id_ususario]);
    if(user.length == 0){
        return false;
    } else {
        return true;
    }
};


const isvalidatedUser = async (id_usuario) => {
    let user_validation = await pool.query('SELECT validado FROM usuarios WHERE id_usuario = ?;',[id_usuario]);
    if(user_validation[0].validado == 0){
        return false;
    } else {
        return true;
    }
};


const inserNewtStudent = async (id_tipo_nivel, id_usuario) => {
    return await pool.query('INSERT INTO alumnos SET ?;', [{id_tipo_nivel, id_usuario}])
};


const existStudent = async (id_usuario) => {
    let student = await pool.query('SELECT * FROM alumnos WHERE id_usuario = ?;', [id_usuario]);
    if(student.length > 0) return true;
    else return false;
};

/**
 * 
 * @param {string} email 
 * @param {boolean} auto_encrypt Cifrar de forma automatica 'email'
 * @returns bool
 */
const existEmail = async (email, auto_encrypt=true) => {
    if(auto_encrypt) email = helpers.encryptEmail(email);
    let res = await pool.query('SELECT id_usuario FROM usuarios WHERE correo_electronico = ?;',[email]);
    if(res.length == 0) return false;
    else return true;
};

const updateName = async (id_usuario, new_name) => {
    return await pool.query("UPDATE usuarios SET nombre = ? WHERE id_usuario = ?;", [new_name, id_usuario]);
};

const updateLastName = async (id_usuario, new_last_name) => {
    return await pool.query("UPDATE usuarios SET apellido = ? WHERE id_usuario = ?;", [new_last_name, id_usuario]);
};

/**
 * 
 * @param {string} id_usuario 
 * @param {string} new_telefono - Nuevo número de Telefono del usuario.
 * @param {boolean} auto_encrypt - Cifrar de forma automatica 'new_telefono'
 * @returns null
 */
const updatePhone = async (id_usuario, new_telefono, auto_encrypt=true) => {
    if(auto_encrypt) new_telefono = helpers.encryptPhone(new_telefono);
    return await pool.query("UPDATE usuarios SET telefono = ? WHERE id_usuario = ?;", [new_telefono, id_usuario]);
};

/**
 * 
 * @param {string} id_usuario 
 * @param {string} new_email - Nuevo correo electronico del usuario
 * @param {boolean} auto_encrypt - Cifrar de forma automatica 'new_email'
 * @returns false if new_email already exist
 */
const updateEmail = async (id_usuario, new_email, auto_encrypt=true) => {
    if(auto_encrypt) new_email = helpers.encryptEmail(new_email);
    return await pool.query("UPDATE usuarios SET correo_electronico = ? WHERE id_usuario = ?;", [new_email, id_usuario]);
};

/**
 * 
 * @param {string} id_usuario 
 * @param {string} new_pass - Nueva contraseña del usuario
 * @param {boolean} auto_encrypt - Encriptar de forma automatica 'new_pass'
 * @returns null
 */
const updatePass = async (id_usuario, new_pass, auto_encrypt=true) => {
    if(auto_encrypt) new_pass = helpers.encryptPassword(new_pass);
    return await pool.query("UPDATE usuarios SET correo_electronico = ? WHERE id_usuario = ?;", [new_pass, id_usuario]);
};

/**
 * 
 * @param {string} id_usuario 
 * @param {boolean} new_validado Validar/Desvalidar usuario
 * @returns null
 */
const updateValidated = async (id_usuario, new_validado) => {
    return await pool.query("UPDATE usuarios SET validado = ? WHERE id_usuario = ?;", [new_validado, id_usuario]);
};


const updateToken = async (id_usuario, new_token) => {
    return await pool.query("UPDATE usuarios SET token = ? WHERE id_usuario = ?;", [new_token, id_usuario]);
};


const updateTypeUser = async (id_usuario, new_id_tipo_usuario) => {
    return await pool.query("UPDATE usuarios SET id_tipo_usuario = ? WHERE id_usuario = ?;", [new_id_tipo_usuario, id_usuario]);
};


const getIdSripe = async (id_usuario) => {
    try{
        let id = await pool.query('SELECT id_stripe FROM usuarios WHERE id_usuario = ?',[id_usuario]);
        return id[0].id_stripe;
    } catch {
        return null;
    }
};

/**
 * id_stripe no debe estar cifrada
 * @param {string} id_stripe
 * @returns stripe.object | null
 */
const getCustomer = async (id_stripe) => {
    let cust = await stripe.customers.retrieve(id_stripe);
    if(cust) return cust;
    else return null;
};


const getIdTypeLevel = async (id_usuario) => {
    let student = await pool.query('SELECT id_tipo_nivel FROM alumnos WHERE id_usuario = ?;', [id_usuario]);
    return student[0].id_tipo_nivel;
};


const getTypeUser = async (id_tipo_usuario) => {
    let typeUser = await pool.query('SELECT tipo_usuario FROM idTipoUsuario WHERE id_tipo_usuario = ?;', [id_tipo_usuario]);
    return typeUser[0].tipo_usuario;
}

/**
 * id_stripe no debe ir cifrado
 * @param {string} id_stripe 
 * @returns {object}
 */
const getSubscription = async (id_stripe) => {
    let subscriptions = await stripe.subscriptions.list({
        customer: id_stripe,
        status: "active"
    });
    if (subscriptions.data.length > 0){
        return subscriptions;
    } else {
        return null;
    }
};

/**
 * Obtiene la informacion util del alumno
 * @param {string} id_stripe - no debe ir cifrado
 * @returns {object}
 */
// const getStudentData = async (id_stripe) => {
//     data = {}
//     let subs = await getSubscription(id_stripe);
//     if(subs) data.subscribe = subs;
//     return data;
// };


module.exports = {
                createUser, 
                updateUser,
                deleteUser,
                userDataToText,
                insertNewUser, 
                getUser, 
                existUser, 
                isvalidatedUser, 
                existEmail,
                updateName,
                updateLastName,
                updatePhone,
                updateEmail,
                updatePass,
                updateValidated,
                updateToken,
                updateTypeUser,
                getIdSripe,
                getCustomer,
                inserNewtStudent,
                existStudent,
                getIdTypeLevel,
                getTypeUser,
                getSubscription,
                //getStudentData
};