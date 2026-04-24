import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService';

const Login = () => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [showPassword,setShowPassword]=useState(false);

    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false)

    const navigate=useNavigate();


    const handleLogin=async(e)=>{
        e.preventDefault();


        if(loading) return;
        setError("");
        setLoading(true);
        try{
          await loginUser(email.trim(),password);
          navigate('/')
        }catch(err){
          if (err.code === "auth/user-not-found") {
    setError("No account found with this email");
} else if (err.code === "auth/wrong-password") {
    setError("Incorrect password");
} else if (err.code === "auth/invalid-email") {
    setError("Invalid email format");
} else {
    setError("Login failed. Try again.");
}
        }finally{
          setLoading(false)
        }
    }

  return (
     <div className='h-screen flex flex-col items-center justify-center bg-gray-900'>
      <h1 className='text-white font-bold text-4xl'>Real-time Chat App</h1>
      <form
      onSubmit={handleLogin}
      className='bg-gray-800 mt-10 p-6 rounded-lg w-80 space-y-4 text-white'
      >

        <h2 className='text-white text-2xl font-bold text-center'>Login</h2>
        <input type="email"
          className='w-full p-2 rounded bg-gray-700 outline-none'
          placeholder='Enter Your Email'
          onChange={(e)=>setEmail(e.target.value)}
          required
          autoFocus
        />

        <div className='relative'>
          <input type={showPassword?'text':'password'}
        className='w-full bg-gray-700 p-2 outline-none rounded'
        placeholder='Password'
        onChange={(e)=>setPassword(e.target.value)}
        required
        />
        <button 
        className='absolute top-3 right-2'
        aria-label="Toggle password visibility"
        type="button" onClick={()=>setShowPassword(!showPassword)}>{showPassword?<FaEye/>:<FaEyeSlash/>}</button>
        </div>

      <button type="submit"
      className='w-full p-2 bg-green-700 rounded outline-none cursor-pointer hover:bg-green-600'
      disabled={loading}
      >{loading?'Logging In...':'Log In'}</button>


    {error && <p className='text-red-300 text-sm text-center'>{error}</p>}
      <p className='text-gray-400 text-sm text-center'>Create New Account?{" "}
                    <Link to='/register' className='text-blue-400'>Register</Link>
                </p>
      </form>
    </div>
  )
}

export default Login