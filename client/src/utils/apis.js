
const apis = () => {
  const local = 'http://localhost:5000/';

  const list = {
    registerUser:`${local}user/register`,
    loginUser: `${local}user/login`,
    forgetPassword: `${local}user/forget/password`,
    verifyOtp: `${local}user/otp/verify`,
    getOtpTime:`${local}user/otp/time`,
    passwordUpdate: `${local}user/password/update`,
    getAccess: `${local}user/get/access`
  }

  return list;
};

export default apis;
