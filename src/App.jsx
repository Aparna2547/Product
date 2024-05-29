import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { Toaster } from 'sonner'
import Home from './Pages/Home'
import SinglePage  from "./Pages/SinglePage";


function App() {

  const token = localStorage.getItem('token')
  return (
    <>
           <Toaster position="top-center" richColors/>

           <Router>
            <Routes>
              <Route path='/signup' element={token ? <Navigate to ='/' /> :<Signup/>}/>
              <Route path='/login' element={token ? <Navigate to='/' />: <Login/>}/>
              <Route path='/' element={<Home/>}/>
              <Route path='/singleview/:id' element={<SinglePage/>}/>
            </Routes>
           </Router>

   
    </>
  )
}

export default App
