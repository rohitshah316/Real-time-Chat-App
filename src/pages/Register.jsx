import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye } from "react-icons/fa";


const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();
        setError("");
        setLoading(true);
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            setLoading(false);
            return;
        }
        try {

            await registerUser(email.trim(), password);

            navigate('/');
        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                setError("Email already registered");
            } else if (err.code === "auth/invalid-email") {
                setError("Invalid email address");
            } else {
                setError("Registration failed. Try again.");
            }

        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='h-screen flex flex-col items-center justify-center bg-gray-900'>
            <h1 className='text-white font-bold text-4xl'>Real-time Chat App</h1>
            <form onSubmit={handleRegister}
                className='bg-gray-800 mt-10 p-6 rounded-lg w-80 space-y-4 text-white'
            >
                <h2 className='text-white text-2xl font-bold text-center'>Register</h2>
                <input type="email"
                    className='w-full p-2 rounded bg-gray-700 outline-none'
                    placeholder='Enter Your Email'
                    onChange={(e) => setEmail(e.target.value)}
                    required

                />




                <div className='relative'>
                    <input type={showPassword ? 'text' : 'password'}
                        placeholder='Create New Password'
                        className='w-full p-2 rounded bg-gray-700 outline-none'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                    <button onClick={() => setShowPassword(!showPassword)}
                        type='button'
                        className='absolute right-2 top-3 text-gray-300'
                    >{showPassword ? <FaEye />
                        : <FaEyeSlash />
                        }</button>
                </div>


                <div className='relative'>

                    <input type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Re-enter New Password'
                        className='w-full p-2 rounded bg-gray-700 outline-none'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                    <button className='absolute top-3 right-2 text-gray-300'
                        type='button'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >{showConfirmPassword ? <FaEye />
                        : <FaEyeSlash />
                        }</button>
                </div>

                <button type='submit'
                    className='w-full p-2 rounded bg-green-700 hover:bg-green-600 cursor-pointer text-white'
                    disabled={loading}
                >{loading ? 'Registering...' : 'Register'}</button>

                {error && <p className='text-red-300 text-sm rounded text-center'>❌{error}</p>}

                <p className='text-gray-400 text-sm text-center'>Already Have an Account?{" "}
                    <Link to='/login' className='text-blue-400'>Login</Link>
                </p>
            </form>
        </div>
    )
}

export default Register