const {format, register} = require('timeago.js');
const {NAMES_TO_ID, IDS_NAMES, PLANS_TO_ID} = require('../config');

const localeFunc = (number, index, totalSec) => {
    // number: the timeago / timein number;
    // index: the index of array below;
    // totalSec: total seconds between date to be formatted and today's date;
    return [
      ['justo ahora', 'ahora mismo'],
      ['hace %s segundos', 'en %s segundos'],
      ['hace 1 minuto', 'en 1 minuto'],
      ['hace %s minutos', 'en %s minutos'],
      ['hace 1 hora', 'en 1 hora'],
      ['hace %s horas', 'en %s horas'],
      ['hace 1 día', 'en 1 día'],
      ['hace %s días', 'en %s días'],
      ['hace 1 semana', 'en 1 semana'],
      ['hace %s semanas', 'en %s semanas'],
      ['hace 1 mes', 'en 1 mes'],
      ['hace %s meses', 'en %s meses'],
      ['hace 1 año', 'en 1 año'],
      ['hace %s años', 'en %s años']
    ][index];
};
// register your locale with timeago
register('es-MX', localeFunc);


const helpers = {};

helpers.timeago_users = (creado) =>{
    return format(creado, 'es-MX');
};

helpers.to_lower_case = (str) =>{
    return str.toLowerCase();
};

helpers.name_to_id = (str) =>{
    return NAMES_TO_ID[str];
};

helpers.plans_to_id = (str) =>{
    return PLANS_TO_ID[str];
};

// classroom

helpers.classroom_to_id = (str) =>{
    return IDS_CLASSROOM[str];
};


helpers.id_to_name = (str) =>{
    return IDS_NAMES[str];
}

helpers.date_ = (fecha) =>{
    let new_date = JSON.stringify(fecha);
    return new_date.slice(1, 11).replace('T', ' ');
};

helpers.dir = () => {
    return __dirname;
};

helpers.re_write_month = (month) =>{
    if (month == 1){
        return "mes"
    } else {
        console.log('entre en 2')
        return `${month} meses`
    }
};

helpers.up_dir = (actual_directory) => {
    const s = actual_directory.split('/');
    s.pop();
    return s.join('/');
};

helpers.IF = (arg1, arg2) =>{
    if (arg1 == arg2){
        return true;
    }
    else{
        return false;
    }
};

helpers.IFU = (arg1, arg2) =>{
    console.log("USER:",arg1);
    console.log("id:",arg2);
    if (arg1 == arg2){
        return true;
    }
    else{
        return false;
    }
};

helpers.if_ = (arg1,arg2) =>{
    if (arg1 == arg2){
        return true;
    }
    else{
        return false;
    }
};

helpers.NOT = (arg1,arg2) =>{
    if (arg1 != arg2){
        return true;
    }
    else{
        return false;
    }
};

helpers.not_ = (arg1,arg2) =>{
    if (arg1 != arg2){
        return true;
    }
    else{
        return false;
    }
};

helpers.AND = (arg1,arg2) =>{
    if (arg1 & arg2){
        return true;
    }
    else{
        return false;
    }
};

helpers.and_ = (arg1,arg2) =>{
    if (arg1 & arg2){
        return true;
    }
    else{
        return false;
    }
};

helpers.GT = (arg1, arg2)=>{
    if (parseInt(arg1) > parseInt(arg2)){
        return true;
    }
    else{
        return false;
    }
};

helpers.gt_ = (arg1, arg2)=>{
    if (parseInt(arg1) > parseInt(arg2)){
        return true;
    }
    else{
        return false;
    }
};

helpers.LT = (arg1, arg2)=>{
    if (parseInt(arg1) < parseInt(arg2)){
        return true;
    }
    else{
        return false;
    }
};

helpers.GTE = (arg1, arg2)=>{
    if (parseInt(arg1) >= parseInt(arg2)){
        return true;
    }
    else{
        return false;
    }
};

helpers.OR = (arg1,arg2) =>{
    if(arg1 || arg2)
        return true;
    else
        return false;
};

helpers.xor_ = (arg1,arg2) =>{
    if(arg1 || arg2)
        return true;
    else
        return false;
};

helpers.ADD = (arg1,arg2) =>{
    return parseInt(arg1) + parseInt(arg2)
};

helpers.SUB = (arg1,arg2) =>{
    return parseInt(arg1) - parseInt(arg2)
};

module.exports = helpers;