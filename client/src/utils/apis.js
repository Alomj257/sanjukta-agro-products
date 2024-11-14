
const apis = () => {
  const local = 'http://localhost:5000/';

  const list = {
    registerUser:`${local}user/register`,
    loginUser: `${local}user/login`,
    forgetPassword: `${local}user/forget/password`,
    verifyOtp: `${local}user/otp/verify`
  }

  return list;
};

export default apis;
