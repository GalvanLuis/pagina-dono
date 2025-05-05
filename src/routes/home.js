const express = require('express');
const pool = require('../database/database');
const router = express.Router();
const {isLoggedIn, isUser, isVerified} = require('../lib/auth');
const {getIdTypeLevel} = require('../lib/user.functions');
const {getStudentData} = require('../lib/student.functions');
const helpers = require('../lib/helpers');
const fs = require('fs');
const handlebars = require('handlebars');
//const Json2csvParser = require('json2csv').Parser;
//const fastcsv = require('fast-csv');
const { query } = require('express');
const { resourceUsage } = require('process');
const {format} = require('timeago.js');

const {STRIPE_KEY, STRIPE_IV, PHONE_KEY, PHONE_IV, EMAIL_KEY, EMAIL_IV} = require('../config');


/*───────────────────────────────────────────────────────────────────────────*/

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//                              PAGINA PRINCIPAL                             //
//                                    ↓↓↓                                    //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////


router.get('/', isLoggedIn, isVerified, isUser, async (req,res) => {
    console.log("ESTOY EN HOMEPAGE")
    //console.log(req.user);
    let data_to_send = {sidebars: true, userNav: true};
    //let data_student = await getStudentData(helpers.decryptData(STRIPE_KEY, STRIPE_IV, req.user.id_stripe));
    let data_student = await getStudentData(req.user.id_stripe);

    helpers.readRoutes('./routes.json', data_to_send, data_student);

    res.render('links/home', data_to_send);
});


module.exports = router;