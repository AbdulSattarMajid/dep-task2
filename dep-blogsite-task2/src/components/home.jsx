import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
  const navigate=useNavigate()
  const Navigate=()=>{
    navigate("/read")
  }
  const Navigation=()=>{
    navigate("/blogs")
  }
  return (
    <div className="home-container">
      <h1>Welcome to AbdulSattar's Blog</h1>
      <p>
        Discover a world of insightful content, where ideas come to life through carefully crafted articles.
        AbdulSattar's Blog is your go-to place for the latest trends, tips, and thoughts on a variety of topics 
        ranging from technology to lifestyle. Stay updated, get inspired, and join the conversation!
      </p>
    <p>A platform to create,delete,update and read blogs</p>
    <div className="buttons">
      <div className="button-home">
        <button  onClick={Navigation} className="btnhome-1">Create</button>
        <button onClick={Navigate} className="btnhome-2">Read Existing</button>
      </div>
    </div>
    </div>
  );
}

export default Home;
