
const apis = () => {
  const local = 'http://localhost:5000/';

  const list = {
    registerUser:`${local}user/register`,
    loginUser: `${local}user/login`,
    forgetPassword: `${local}user/forget/password`,
    verifyOtp: `${local}user/otp/verify`,
    getOtpTime:`${local}user/otp/time`,
    passwordUpdate: `${local}user/password/update`,
    getAccess: `${local}user/get/access`,
    getAllSuppliers: `${local}suppliers`,
    addSupplier: `${local}suppliers/add-supplier`,
    deleteSupplier: (id) => `${local}suppliers/delete-supplier/${id}`,
    viewSupplier : (id) => `${local}suppliers/view-supplier/${id}`,
    updateSupplier : (id) => `${local}suppliers/update-supplier/${id}`
  }

  return list;
};

export default apis;
