import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { Toaster } from 'sonner'
import Home from './Pages/Home'
import SinglePage  from "./Pages/SinglePage";


function App() {

  return (
    <>
           <Toaster position="top-center" richColors/>

           <Router>
            <Routes>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/' element={<Home/>}/>
              <Route path='/singleview' element={<SinglePage/>}/>
            </Routes>
           </Router>

   
    </>
  )
}

export default App
