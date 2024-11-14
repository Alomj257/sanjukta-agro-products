const express = require('express');
const register = require('../controllers/register');
const login = require('../controllers/login')
const forgetPassword = require('../controllers/forgetPassword');
const verifyOtp = require('../controllers/verifyOtp');
const getOtpTime = require('../controllers/getOtpTime');
const passwordUpdate = require('../controllers/passwordUpdate')

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forget/password', forgetPassword);
router.post('/otp/verify', verifyOtp);
router.post('/otp/time', getOtpTime);
router.post('/password/update', passwordUpdate);

module.exports = router;