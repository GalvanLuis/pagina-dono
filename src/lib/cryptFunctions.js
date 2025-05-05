const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const fs = require('fs');
const config = require('../config');
const keys = require('../keys');


const createKey = async (file) => {
    const key = crypto.randomBytes(32).toString('hex').slice(0,32); // 256 bits
    await fs.promises.writeFile(`./keys/${file}`, key);
    return key;
};


const createIV = async (file) => {
    const iv = crypto.randomBytes(16).toString('hex').slice(0,16); // 128 bits
    await fs.promises.writeFile(`./keys/${file}`, iv);
    return iv;
};


const encryptData = (key, iv, data) => {
    const encrypter = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encryptedData = encrypter.update(data, 'utf-8', 'hex');
    return encryptedData + encrypter.final('hex');
};


const decryptData = (key, iv, data) => {
    const decrypter = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decryptedData = decrypter.update(data, "hex", "utf8");
    return decryptedData + decrypter.final("utf-8");
};

const encryptEmail = (email) => {
    return encryptData(config.EMAIL_KEY, config.EMAIL_IV, email);
};


const decryptEmail = (email) => {
    return decryptData(config.EMAIL_KEY, config.EMAIL_IV, email);
};


const encryptPhone = (phone) => {
    return encryptData(config.PHONE_KEY, config.PHONE_IV, phone);
};


const decryptPhone = (phone) => {
    return decryptData(config.PHONE_KEY, config.PHONE_IV, phone);
};


const encryptStripeId = (id_stripe) => {
    return encryptData(config.STRIPE_KEY, config.STRIPE_IV, id_stripe);
};


const decryptStripeId = (id_stripe) => {
    return decryptData(config.STRIPE_KEY, config.STRIPE_IV, id_stripe);
};


const encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    return new Promise((resolve, reject) => {
        try{
            const hash = bcrypt.hash(password, salt);
            resolve(hash);
        } catch (error) {reject(error)}
    });
};


const matchPassword = async (password, savepassword) =>{
    return new Promise((resolve, reject) => {
        try{ resolve(bcrypt.compare(password, savepassword)) } 
        catch (error) {reject(error)}
    }) 
};

/**
 * user_data = {
 *  column1: value,
 *  column2: value,
 *  ...
 * }
 * @param {*} user_data 
 * @returns 
 */
const decryptOneUserData = async (user_data) =>{
    let decrypt = {};
    return new Promise((resolve, reject) => {
        try{
            for(let key in user_data){
                if (key == config.ENCRYPTED_USER_COLUMNS.ID_STRIPE_COLUMN_NAME)
                    decrypt[key] = decryptStripeId(user_data[key]);
                else if(key == config.ENCRYPTED_USER_COLUMNS.PHONE_COLUMN_NAME)
                    decrypt[key] = decryptPhone(user_data[key]);
                else if(key == config.ENCRYPTED_USER_COLUMNS.EMAIL_COLUMN_NAME)
                    decrypt[key] = decryptEmail(user_data[key]);
                else
                    decrypt[key] = user_data[key];
            }
            resolve(decrypt)
        } catch (error) {reject(error)}
    });
};


/**
 * users_data = [user_data1, user_data2, ...]
 * 
 * @param {*} user_data 
 * @returns 
 */
const decryptUsersData = async (users_data) =>{
    let decrypt = [];
    for(let index in users_data){
        decrypt.push(decryptOneUserData(users_data[index]));
    }
    return Promise.all(decrypt);
};

/**
 * type_users_object = {
 *  ID_TYPE_USER1: [
 *      user_data1,
 *      user_data2,
 *      ...
 *  ],
 *  ID_TYPE_USER2: [
 *      ...
 *  ],
 *  ...
 * }
 * @param {object} type_users_object 
 */
const decryptUsersDataFromDB = async (type_users_object, id_to_name = false) =>{
    let decryptUsers = {}
    for(let id_type_users in type_users_object){
        if(id_to_name)
            decryptUsers[config.IDS_NAMES[id_type_users]] = await decryptUsersData(type_users_object[id_type_users]);
        else
            decryptUsers[id_type_users] = await decryptUsersData(type_users_object[id_type_users]);
    }
    return decryptUsers;
}


module.exports = {
    createKey,
    createIV,
    encryptData,
    decryptData,
    encryptEmail,
    decryptEmail,
    encryptPhone,
    decryptPhone,
    encryptStripeId,
    decryptStripeId,
    encryptPassword,
    matchPassword,
    decryptOneUserData,
    decryptUsersData,
    decryptUsersDataFromDB
}