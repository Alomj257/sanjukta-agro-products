import React from 'react'
import Button from '../ui/Button'
import BackToLogin from '../ui/BackToLogin'
import { IoFingerPrintSharp } from "react-icons/io5";
import './auth.css'

const VerifyOtp = () => {
    return (
        <div className="auth_main">
            <form>
                <div className="auth_container">

                    {/* Header */}
                    <div className="auth_header">
                        <IoFingerPrintSharp />
                        <p className="auth_heading">Forget your password</p>
                        <p className="auth_title">Enter your registred email we will send a 6-digit OTP</p>
                    </div>

                    {/* Input fileds */}


                    {/* Button */}
                    <div className="auth_action">
                        <Button>Verify OTP</Button>
                    </div>
                    <div>
                        <BackToLogin />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default VerifyOtp