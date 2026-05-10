import React from 'react'
import { auth } from './services/firebase'
import { BrowserRouter,Routes, Route } from 'react-router'
import Register from './pages/Register'
import Login from './pages/Login'
import useAuth from './hooks/useAuth'

const App = () => {

  const {user,loading}=useAuth();

  console.log("user:",user);
  console.log("loading:",loading)

  console.log(auth)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App