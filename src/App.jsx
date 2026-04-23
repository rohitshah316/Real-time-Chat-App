import React from 'react'
import { auth } from './services/firebase'
import { BrowserRouter,Routes, Route } from 'react-router'
import Register from './pages/Register'
import Login from './pages/Login'

const App = () => {

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