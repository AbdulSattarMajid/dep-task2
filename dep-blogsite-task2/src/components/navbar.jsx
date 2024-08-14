import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
function Navbar() {
  return (
    <>
    <div className="navbar">
      <h2>AbdulSattar's Blogs</h2>
      <ul>
        <li ><Link to ='/'>Home</Link></li>
        <li ><Link to ='/read'>Read</Link></li>
        <li ><Link to ='/blogs'>Create</Link></li>
        <li ><Link to ='/about'>About</Link></li>
      </ul>
    </div>
    </>
  )
}

export default Navbar