const nodemailer = require("nodemailer");
const fs = require('fs');
const handlebars = require('handlebars');


const createTrans = () => {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "9275e75f3a8a9b",
          pass: "91775cf7dec48d"
        }
      });

    return transport
};


const sendMail = async (from, to, subject, text) => {
    
    const transporter = createTrans();
    let details = {
        from: from,
        to: to,
        subject: subject,
        html: text
    }
    
    await transporter.sendMail(details, (error, info) => {
        if(error){
            console.log("error:",error);
            return false;
        } else {
            console.log("menasaje enviado:",info.messageId);
            return true;
        }
    });  
};


const welcomeMail = (newUser, from, to) => {
    fs.readFile('./src/views/templates/welcome_email.html', 'utf-8', (err, html) => {
        if(err){
            console.error(err);
            return;
        }

        var template = handlebars.compile(html);
        var replacements = {
            username: newUser.nombre,
            info: encodeURIComponent(newUser.token+'&'+newUser.id_usuario)
        };
        var htmlToSend = template(replacements);
        sendMail(from,to, "Bienvenido", htmlToSend);
    });
};


const verifyMail = (user, from, to) => {
    fs.readFile('./src/views/templates/verify_email.html', 'utf-8', (err, html) => {
        if(err){
            console.error(err);
            return;
        }
        var template = handlebars.compile(html);
        var replacements = {
            username: user.nombre,
            info: encodeURIComponent(user.token+'&'+user.id_usuario)
        };
        var htmlToSend = template(replacements);
        sendMail(from, to, "Verificacion de correo", htmlToSend);
    });
};

module.exports = {createTrans, sendMail, welcomeMail, verifyMail};