import React, { useState } from 'react'
import './Home.css';
import LeftSideBar from '../Components/LeftSideBar';
import HeroVideos from '../Components/HeroVideos';
import { useContext } from 'react';
import { WrapContext } from '../App';

const Home = () => {

  const [category,setCategory] = useState(0); 
  const [region,setRegion] = useState("US");


  
  return (
    <>
       <div className="my-container">
          <LeftSideBar setCategory={setCategory} setRegion={setRegion}/>
          <HeroVideos category={category} region={region}/>
      </div>  
    </>
  )
}

export default Home