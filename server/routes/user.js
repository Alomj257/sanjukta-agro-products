const express = require('express');
const register = require('../controllers/authController/register');
const login = require('../controllers/authController/login')
const forgetPassword = require('../controllers/authController/forgetPassword');
const verifyOtp = require('../controllers/authController/verifyOtp');
const getOtpTime = require('../controllers/authController/getOtpTime');
const passwordUpdate = require('../controllers/authController/passwordUpdate')
const getAccess = require('../controllers/authController/getAccess');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forget/password', forgetPassword);
router.post('/otp/verify', verifyOtp);
router.post('/otp/time', getOtpTime);
router.post('/password/update', passwordUpdate);
router.post('/get/access', getAccess);

module.exports = router;