import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { MdMarkEmailRead } from "react-icons/md";
import './auth.css';
import BackToLogin from '../ui/BackToLogin';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');

    const emailChange = (event) => {
        setEmail(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth_main">
            <form onSubmit={submitHandler}>
                <div className="auth_container">

                    {/* Header */}
                    <div className="auth_header">
                        <MdMarkEmailRead />
                        <p className="auth_heading">Forget your password</p>
                        <p className="auth_title">Enter your registred email we will send a 6-digit OTP</p>
                    </div>

                    {/* Input fileds */}
                    <div className="auth_item">
                        <label>Email *</label>
                        <Input onChange={emailChange} required type='email' placeholder='Enter your email' />
                    </div>

                    {/* Button */}
                    <div className="auth_action">
                        <Button>Send OTP</Button>
                    </div>
                    <div>
                        <BackToLogin/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ForgetPassword