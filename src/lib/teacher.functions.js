const pool = require('../database');
const {getSubscription} = require('./user.functions');


// const getTeacherData

const updateUser = async (user, new_name=null, new_last_name=null, new_phone=null, new_email=null, new_validated=null) => {
    let exist_email = true;

    if(new_email != user.new_email){
        exist_email = await existEmail(encryptData(EMAIL_KEY, EMAIL_IV, new_email));
    }

    if(exist_email) return false; // no puedes poner a 2 usuarios el mismo correo electronico

    // if(exist_email && new_email != user.new_email) {
    //     /** no puedes poner a 2 usuarios el mismo correo electronico */
    //     /** ¿para que hacer una solicitud a la BD para que deje el 
    //      *  mismo correo electronico del usuario?
    //      */
    //     return false;
    // };

    if(new_name && new_name != user.nombre) updateName(id_usuario, new_name);
    if(new_last_name && new_last_name != user.apellido) updateLastName(id_usuario, new_last_name);
    if(new_phone && new_phone != user.telefono) updatePhone(id_usuario, new_phone);
    if(!exist_email){
        updateEmail(id_usuario, new_email);
        stripe.customers.update(
            user.id_stripe,
            {
                email: new_email
            }
        );
    };
    if(new_validated && new_validated != user.validado){
        if(!new_validated){
            updateValidated(id_usuario, false);
            updateToken(id_usuario, uuidv4());
            verifyMail(user, "SAS <sas@test.com>", new_email);
        } else {
            updateValidated(id_usuario, true);
            updateToken(id_usuario, '');
        }
    };
};