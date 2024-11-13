import React, { useState } from 'react';
import './auth.css';
import Input from '../ui/Input';
import { FaUserPlus } from "react-icons/fa";
import Button from '../ui/Button';
import BackToLogin from '../ui/BackToLogin';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const nameChange = (event) => {
        setName(event.target.value);
    }

    const emailChange = (event) => {
        setEmail(event.target.value);
    }

    const passwordChange = (event) => {
        setPassword(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(name);
        console.log(email);
        console.log(password);
        navigate('/login')
    }

    return (
        <div className='auth_main'>

            <form onSubmit={submitHandler}>
                <div className="auth_container">

                    {/* Header */}
                    <div className="auth_header">
                        <FaUserPlus />
                        <p className="auth_heading">Welcome to Sanjukta</p>
                        <p className="auth_title">Create a new account</p>
                    </div>

                    {/* Input fileds */}
                    <div className="auth_item">
                        <label>Name *</label>
                        <Input onChange={nameChange} required type='text' placeholder='Enter your name' />
                    </div>
                    <div className="auth_item">
                        <label>Email *</label>
                        <Input onChange={emailChange} required type='email' placeholder='Enter your email' />
                    </div>
                    <div className="auth_item">
                        <label>Password *</label>
                        <Input onChange={passwordChange} required type='password' placeholder='Enter your password' />
                    </div>

                    {/* Button */}
                    <div className="auth_action">
                        <Button>Register</Button>
                    </div>
                    <div>
                        <BackToLogin/>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Register