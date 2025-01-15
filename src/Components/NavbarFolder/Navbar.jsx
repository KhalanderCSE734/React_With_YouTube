//                                          React Icons (Import)
import { MdOutlineMissedVideoCall, MdKeyboardVoice } from "react-icons/md";
import { HiBars3 } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa6";
//                                          React Imports (Hooks)
import React from 'react';
import { useState, useContext, useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//                                          CSS Imports
import './Navbar.css';
import './NavbarMedia.css';
//                                          React components and Contexts
import { WrapContext } from "../../App";



/*
            <div className="video">
             <MdOutlineMissedVideoCall />
            </div>
            <div className="Bars">
               <HiBars3 />
            </div>
            <div className="Search">
                <CiSearch />
            </div>
            <div className="Voice">
                <MdKeyboardVoice />
            </div>
            <div className="Notification-Bell">
                <FaRegBell />
            </div>
*/








const Navbar = ()=>{

    const [search,setSearch] = useState("");
    const yt_logo = useRef();


    const goHome = useNavigate();
    const goSearch = useNavigate();

    const value = useContext(WrapContext);
    // console.log(value);

    //                              Search Connection To React
    const handleSearch = (evt)=>{
        setSearch(evt.target.value);
    }
    //                              Submit option
    const handleSubmit = (evt)=>{
        // console.log("Query Searched");
        evt.preventDefault();
        if((search.trim())!==""){
            // console.log(search.trim());
            goSearch(`/search/${search.trim()}`);
        }
        setSearch("");
    }

    
    //                              Handle LeftSide Bar Opening or Closing
    const handleSideBar = ()=>{
      value.fun(prev=>!prev);
    }
    //                              Changing logo In phone
    const media = window.matchMedia("(max-width: 400px)");
    
    const changeLogo = ()=>{
        yt_logo.current.src = "/Youtube_Mobile.png";
        yt_logo.current.style.width = "50px";
        yt_logo.current.style.height = "50px";
    }

    useEffect(()=>{ 
        if(media.matches){
            changeLogo();
        }
    },[]);
    media.addEventListener("change",changeLogo);

    return(
        <>
            <nav className="mainNav">
                <div className="first">
                    <div className="bars" onClick={handleSideBar}>
                        <HiBars3 />
                    </div>
                    <div className="logo" >
                       <img src="/Logo.png" alt="You_Tube_Logo" ref={yt_logo} onClick={()=>{goHome("/")}}/>
                    </div>
                </div>
                <div className="middle">
                    <form className="search" onSubmit={handleSubmit}>
                       <input type="text" name="search" value={search} placeholder="Search" onChange={handleSearch}/>
                       <button className="search-icon">
                            <CiSearch />
                       </button>
                    </form>
                    <div className="voice">
                        <MdKeyboardVoice />
                    </div>
                </div>
                <div className="last">
                    <div className="upload">
                        <div className="video">
                          <MdOutlineMissedVideoCall />
                        </div>
                        <p className="text">
                            Create
                        </p>
                    </div>
                    <div className="notification">
                        <FaRegBell />
                    </div>
                    <div className="profile">
                        <img src="/Profile.png" alt="profile_photo"/>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;