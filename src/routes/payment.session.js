const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotValidated, isVerified} = require('../lib/auth');

const {createSession} = require('../lib/payment.controller');


router.post("/", createSession);




module.exports = router;