const bcrypt = require('bcryptjs');
const pool = require('../database/database');
const crypto = require("crypto");
const fs = require('fs');
const axios = require('axios');
const handlebars = require('handlebars');
const {re_write_month} = require('../lib/handlebars');
const config = require('../config');


const helpers = {};


handlebars.registerHelper('re_write_month', re_write_month);

async function createKey(file) {
    const key = crypto.randomBytes(32).toString('hex').slice(0,32); // 256 bits
    await fs.promises.writeFile(`./keys/${file}`, key);
    return key;
};


async function createIV(file) {
    const iv = crypto.randomBytes(16).toString('hex').slice(0,16); // 128 bits
    await fs.promises.writeFile(`./keys/${file}`, iv);
    return iv;
};


helpers.createKey = createKey;
helpers.createIV = createIV;


helpers.encryptData = (key, iv, data) => {
    const encrypter = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encryptedData = encrypter.update(data, 'utf-8', 'hex');
    return encryptedData + encrypter.final('hex');
};


helpers.decryptData = (key, iv, data) => {
    const decrypter = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decryptedData = decrypter.update(data, "hex", "utf8");
    return decryptedData + decrypter.final("utf-8");
};

helpers.encryptEmail = (email) => {
    return helpers.encryptData(config.EMAIL_KEY, config.EMAIL_IV, email);
};


helpers.decryptEmail = (email) => {
    return helpers.decryptData(config.EMAIL_KEY, config.EMAIL_IV, email);
};


helpers.encryptPhone = (phone) => {
    return helpers.encryptData(config.PHONE_KEY, config.PHONE_IV, phone);
};


helpers.decryptPhone = (phone) => {
    return helpers.decryptData(config.PHONE_KEY, config.PHONE_IV, phone);
};


helpers.encryptStripeId = (id_stripe) => {
    return helpers.encryptData(config.STRIPE_KEY, config.STRIPE_IV, id_stripe);
};


helpers.decryptStripeId = (id_stripe) => {
    return helpers.decryptData(config.STRIPE_KEY, config.STRIPE_IV, id_stripe);
};


helpers.encryptPassword = async (password) =>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (e) {
        console.log(e);
    }
};


helpers.matchPassword = async (password,savepassword) =>{
    try{
       return await bcrypt.compare(password,savepassword);
    } catch(e){
        console.log(e);
    }
};


helpers.verifyCaptcha = async (skey, captchaResponse) => {
    try {
        const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
          params: {
            secret: skey,
            response: captchaResponse,
          },
        });
    
        const { success } = response.data;
    
        if (success) {
          return true;
        } else {
          return false;
        }
    } catch (error) {
        console.error('Error al verificar el captcha:', error);
        return false;
    }
};


helpers.verifyToken = async (token, id_usuario) => {
    let user_token = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?',[id_usuario]);
    if (user_token[0].token == token)
        return true;
    else return false;
};


helpers.readRoutes = (path, data_to_send, data_student) => {
    let routes_data = fs.readFileSync(path);

    data_to_send.routes = JSON.parse(routes_data);

    for(let key in data_to_send.routes) {
        if(data_to_send.routes.hasOwnProperty(key)) {
            if(!data_to_send.routes[key].require_subscription 
                || 
                data_to_send.routes[key].require_subscription 
                && 
                data_student.hasOwnProperty('subscribe')
            ){
                let html = fs.readFileSync('./src/views/lsidebar/' + data_to_send.routes[key].hbs, 'utf-8');
                let template = handlebars.compile(html);
                let replacements = {}
                data_to_send.routes[key]['json'].forEach(json => {
                    Object.assign(replacements, JSON.parse(fs.readFileSync(json, 'utf-8')));
                });
                var htmlToSend = template({"plans":replacements});
                data_to_send.routes[key].html = htmlToSend;
            }
            else {
                data_to_send.routes[key].html = fs.readFileSync('./src/views/templates/require_subscription.hbs', 'utf-8');
            }
        }
    }
};

helpers.readAdminSidebar = (path, current_tab) => {
    let json = fs.readFileSync(path);

    let sidebar = JSON.parse(json);

    for(let key in sidebar){
        if(sidebar.hasOwnProperty(key) && key == current_tab){
            sidebar[key].active = "active";
        }
    }

    return sidebar;
};

helpers.readTeacherSidebar = (path, current_tab) => {
    let json = fs.readFileSync(path);

    let sidebar = JSON.parse(json);

    for(let key in sidebar){
        if(sidebar.hasOwnProperty(key) && key == current_tab){
            sidebar[key].active = "active";
        }
    }

    return sidebar;
};

module.exports = helpers;