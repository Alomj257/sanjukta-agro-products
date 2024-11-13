import { React, useState } from 'react'
import Input from '../ui/Input';
import Button from '../ui/Button';
import { AiOutlineLogin } from "react-icons/ai";
import { Link } from 'react-router-dom';
import './auth.css'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailChange = (event) => {
        setEmail(event.target.value);
    }

    const passwordChange = (event) => {
        setPassword(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(email);
        console.log(password);
    }

    return (
        <div className="auth_main">
            <form onSubmit={submitHandler}>
                <div className="auth_container">

                    {/* Header */}
                    <div className="auth_header">
                        <AiOutlineLogin />
                        <p className="auth_heading">Welcome to Sanjukta</p>
                        <p className="auth_title">Login to continue</p>
                    </div>

                    {/* Input fileds */}
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
                        <Button>Login</Button>
                    </div>

                    <div className="auth_options">
                        <Link to='/register'>Create new account?</Link>
                        <Link to='/forget/password'>Forgot password?</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login