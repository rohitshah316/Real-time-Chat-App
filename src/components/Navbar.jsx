import React from 'react'
import useAuth from '../hooks/useAuth';
import {logoutUser} from '../services/authService'
const Navbar = () => {
    const {user}=useAuth();

    const handleLogout=async()=>{
        try{
            await logoutUser();
        }catch(err){
            console.error("Logout failed:",err);
        }
    }
  return (
    <div className='flex items-center justify-between bg-gray-800 px-6 py-3'>
        <h1 className='text-white font-bold text-lg'>Real-time Chat App</h1>
        <div className='flex items-center gap-4'>
            <p className='text-gray-300 text-sm'>
                {user?.displayName.toUpperCase() || user?.email}
            </p>
            <button 
            className='bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded cursor-pointer'
            onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar