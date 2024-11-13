import React, { useState } from 'react'
import Button from '../ui/Button'
import BackToLogin from '../ui/BackToLogin'
import Input from '../ui/Input'
import { RxUpdate } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import './auth.css';

const UpdatePassword = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const passwordChange = (event) => {
        setPassword(event.target.value);
    }

    const confirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(password);
        console.log(confirmPassword);
        navigate('/login')
    }

    return (
        <div className="auth_main">
            <form onSubmit={submitHandler}>
                <div className="auth_container">

                    {/* Header */}
                    <div className="auth_header">
                        <RxUpdate />
                        <p className="auth_heading">New password</p>
                        <p className="auth_title">Enter at least 8-digit long password</p>
                    </div>

                    {/* Input fileds */}
                    <div className="auth_item">
                        <label>Password *</label>
                        <Input onChange={passwordChange} required type='text' placeholder='New password' />
                    </div>

                    <div className="auth_item">
                        <label>Confirm Password *</label>
                        <Input onChange={confirmPasswordChange} required type='text' placeholder='Confirm password' />
                    </div>

                    {/* Button */}
                    <div className="auth_action">
                        <Button>Update Password</Button>
                    </div>
                    <div>
                        <BackToLogin />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdatePassword