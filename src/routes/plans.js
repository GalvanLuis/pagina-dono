const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotValidated, isVerified} = require('../lib/auth');
const fs = require('fs');


router.get('/', isLoggedIn, isVerified, (req, res) => {
    let json_data = fs.readFileSync('./plans.json');

    let plans = JSON.parse(json_data);

    // for(let key in routes) {
    //     if(plans.hasOwnProperty(key)) {
    //         for(let page of plans[key].hbs){
    //             fs.readFile('./src/views/lsidebar/' + page, 'utf-8', (err, html) => {
    //                 if(err){
    //                     console.error(err);
    //                     return; 
    //                 }
    //                 var template = handlebars.compile(html);
    //                 // var replacements = {
    //                 //     username: newUser.nombre,
    //                 //     info: encodeURIComponent(newUser.token+'&'+newUser.id_usuario)
    //                 // };
    //                 // var htmlToSend = template(replacements);
    //                 routes[key].html = template;
    //             });
    //         }
    //     }
    // }

    console.log({plans});

    res.render('links/plans', {sidebars: false, plans});
})

module.exports = router;