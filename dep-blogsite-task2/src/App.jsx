import React from 'react'
import Blogs from './components/blogs'
import Navbar from './components/navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home'
import Footer from './components/Footer'
import Read from './components/read'
import About from './components/about'

export default function App() {

  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/blogs' element={<Blogs/>}/>
      <Route path='/read' element={<Read/>}/>
      <Route path='/about' element={<About/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  )
}
