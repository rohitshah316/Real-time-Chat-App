import React from 'react'
import { auth } from './services/firebase'
import { BrowserRouter,Routes, Route, Navigate } from 'react-router'
import Register from './pages/Register'
import Login from './pages/Login'
import useAuth from './hooks/useAuth'
import Navbar from './components/Navbar';
import MessageInput from './components/MessageInput';


const ProtectedRoute=({user,children})=>{
  if(!user) return <Navigate to='/login' replace/>
  return children;
}


const PublicRoute=({user,children})=>{
  if(user) return <Navigate to='/' replace/>;
  return children;
}

const App = () => {

  const {user,loading}=useAuth();


  if(loading) return <div className='h-screen flex items-center justify-center bg-gray-900 text-white'>Loading...</div>
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute user={user}>
           <div className='flex flex-col min-h-screen'>
             <Navbar/>
            <div className='flex-1'>Chat Page Loading...</div>

            <MessageInput/>
           </div>
          </ProtectedRoute>
        }/>
        <Route path='/register' element={
          <PublicRoute user={user}>
                <Register/>
          </PublicRoute>
        }/>
        <Route path='/login' element={
          <PublicRoute user={user}>
                <Login/>
          </PublicRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App