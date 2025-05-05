require('dotenv').config();

const DOMAIN = "http://localhost:4000/"

/**
 * Llaves y contraseñas para el cifrado de informacion
 */
const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY;
const RECAPTCHA_KEY = process.env.RECAPTCHA_KEY;
const EMAIL_KEY = process.env.EMAIL_KEY;
const EMAIL_IV = process.env.EMAIL_IV;
const PHONE_KEY = process.env.PHONE_KEY;
const PHONE_IV = process.env.PHONE_IV;
const STRIPE_KEY = process.env.STRIPE_KEY;
const STRIPE_IV = process.env.STRIPE_IV;

/**
 * Nombre de las columnas de la tabla 'usuarios' que estan cifradas
 */
const ENCRYPTED_USER_COLUMNS = {
    ID_STRIPE_COLUMN_NAME: "id_stripe",
    PHONE_COLUMN_NAME: "telefono",
    EMAIL_COLUMN_NAME: "correo_electronico"
};

/**
 * ID's de los tipos de usuarios
 * Alumno, Maestro, Administrador o Usuario registrado.
 * Es cierto que se puede hacer un 'query' a la BD pero
 * eso podría hacer que la pagina tarde en cargar (dependiendo
 * de la lentitud del internet). Por lo que se optó por escribirlo
 * manualmente.
 */
const ID_USUARIO = 1;
const ID_ALUMNO = 2;
const ID_MAESTRO = 3;
const ID_ADMIN = 4;

const IDS_NAMES = {
    "1": "Usuario",
    "2": "Alumno",
    "3": "Maestro",
    "4": "Admin"
};

const NAMES_TO_ID = {
    "Usuario": "1",
    "Alumno": "2",
    "Maestro": "3",
    "Admin": "4"
};

const PLANS_TO_ID = {
    "Presencial": "1",
    "Remoto": "2",
    "Autonomo": "3"
};

const IDS_USER_TYPE = ["1", "2", "3", "4"];

/**
 * ID's de los tipos de Suscripciones
 * Presencial, Virtual, Autonomo
 */
const ID_SUB_PRESENCIAL = 1;
const ID_SUB_VIRTUAL = 2;
const ID_SUB_AUTONOMO = 3;

/** 
 * Sidebar config
 */
const DEFAULT_SIDEBAR_PARAMS = {
    "item": "string",
    "icon": "string",
    "link": "string",
};

const ADMIN_SIDEBAR_PATH = "./src/configs/admin-sidebar.json"

const TEACHER_SIDEBAR_PATH = "./src/configs/teacher-sidebar.json"


/**
 * Navbar config
 */
const LOGGED_NAVBAR_PATH = "./src/configs/logged-navbar.json"


module.exports = {
    DOMAIN,
    STRIPE_PRIVATE_KEY,
    RECAPTCHA_KEY,
    EMAIL_KEY,
    EMAIL_IV,
    PHONE_KEY,
    PHONE_IV,
    STRIPE_KEY,
    STRIPE_IV,
    PLANS_TO_ID,
    ENCRYPTED_USER_COLUMNS,
    ID_USUARIO,
    ID_ALUMNO,
    ID_MAESTRO,
    ID_ADMIN,
    IDS_NAMES,
    NAMES_TO_ID,
    IDS_USER_TYPE,
    ID_SUB_PRESENCIAL,
    ID_SUB_VIRTUAL,
    ID_SUB_AUTONOMO,
    DEFAULT_SIDEBAR_PARAMS,
    ADMIN_SIDEBAR_PATH,
    TEACHER_SIDEBAR_PATH,
    LOGGED_NAVBAR_PATH
};