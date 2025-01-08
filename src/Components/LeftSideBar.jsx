import React from 'react';
import { useState, useRef, useContext, useEffect } from 'react';
import { WrapContext } from '../App';
import { useNavigate } from 'react-router-dom';
import './LeftSideBar.css';
import './LeftSideBarMedia.css';
import './Sections/RectangleComponent/ImageRectangle.css';
import Rectangle from  './Sections/RectangleComponent/Rectangle';
import ImageRectangle from './Sections/RectangleComponent/ImageRectangle';

//              importing all the icons

import { TiHome } from "react-icons/ti";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions,MdOutlineOndemandVideo,MdOutlineWifiTethering,MdOutlineSettings } from "react-icons/md";
import { GrHistory } from "react-icons/gr";
import { TbPlaylist,TbBuildingCircus,TbMessageReport } from "react-icons/tb";
import { FaRegClock,FaShoppingBag,FaRegQuestionCircle } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { FaFire,FaRegFlag } from "react-icons/fa6";
import { CiMusicNote1,CiTrophy  } from "react-icons/ci";
import { PiFilmSlateLight,PiNewspaperClipping  } from "react-icons/pi";
import { IoRadioOutline } from "react-icons/io5";
import { SiYoutubegaming } from "react-icons/si";
import { LuGraduationCap } from "react-icons/lu";


//              SVG from Youtube for 'playlist'
/*

<div style={{width:"100%", height: "100%", display: "block", fill: "white",pointerEvents:"none",display:"inherit",width:"100%",height:"100%"}}><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"><path clipRule="evenodd" d="M3.75 5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75S20.664 5 20.25 5H3.75Zm0 4c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75S20.664 9 20.25 9H3.75Zm0 4c-.414 0-.75.336-.75.75s.336.75.75.75h8.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-8.5Zm8.5 4c.414 0 .75.336.75.75s-.336.75-.75.75h-8.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h8.5Zm3.498-3.572c-.333-.191-.748.05-.748.434v6.276c0 .384.415.625.748.434L22 17l-6.252-3.572Z" fillRule="evenodd"></path></svg></div>

*/











const LeftSideBar = ({setCategory,setRegion})=>{

  
  
  const main = useRef();
  
  const value = useContext(WrapContext);
  
  // console.log(value);

  //                                  Handling toggle of Hamburger
  //  I can never forget this moment it's 25th december (24th midnight) 1:32PM, With lots of Struggls I fixed it ☃️🥶🥶, I can          
  //                                                                   never forget this trick to handle these kind of situation
  useEffect(()=>{
      if(value.isOpen){
        main.current.style.display = "none";
        main.current.style.position = "relative";
      }else{
        main.current.style.display = "flex";
        if(media.matches){
          main.current.style.position = "absolute";
          main.current.style.height = "100%";
        }
      }
  },[value.isOpen]);


  const media = window.matchMedia("(max-width: 800px)");
  useEffect(()=>{
    if(media.matches){
      value.fun(true);
    }
  },[])

  const handleMediaChange = (evt)=>{
    // console.log(evt.matches);
    if(evt.matches){
      main.current.style.display = "none";
      main.current.style.position = "absolute";
      main.current.style.height = "100%";
    }else{
      main.current.style.display = "flex";
      main.current.style.position = "relative";
    }
  }
  media.addEventListener("change", handleMediaChange);

/*
            <div className="home">
             <TiHome />
            </div>
            <div className="shorts">
               <SiYoutubeshorts />
            </div>
            <div className="subscription">
                <MdSubscriptions />/>
            </div>

            <div className="history">
                <GrHistory />
            </div>
            <div className="playlist">
                <TbPlaylist />
            </div>
            <div className="your-videos">
                <MdOutlineOndemandVideo />
            </div>
            <div className="watch-later">
                <FaRegClock />
            </div>
            <div className="Like">
                <BiLike />
            </div>
            <div className="trending">
                <FaFire />
            </div>
            <div className="shopping">
                <FaShoppingBag />
            </div>
            <div className="music">
                <CiMusicNote1 />
            </div>
            <div className="film">
                <PiFilmSlateLight />
            </div>
            <div className="live-server">
                <IoRadioOutline />
            </div>
            <div className="gaming">
                <SiYoutubegaming />
            </div>
            <div className="news">
                <PiNewspaperClipping  />
            </div>
            <div className="cup">
                <CiTrophy   />
            </div>
            <div className="courses">
                <LuGraduationCap   />
            </div>
            <div className="beauty">
                <TbBuildingCircus />
            </div>
            <div className="podcast">
                <MdOutlineWifiTethering  />
            </div>
            <div className="setting">
                <MdOutlineSettings   />
            </div>
            <div className="flag">
                <FaRegFlag  />
            </div>
            <div className="question">
                <FaRegQuestionCircle />
            </div>
            <div className="feedback">
                <TbMessageReport  />
            </div>
*/


// const goHome = ()=>{
//   // console.log(value.setCategory);
//   // console.log(value.category);
//   // value.setCategory(17); 
//   // console.log(setCategory);
//   // console.log(setRegion);
//   setCategory(10); 
// }

  

  return(
    <>       
        <div className="main" ref={main}>
            <div className="main-section">
                <Rectangle icon={TiHome} text="Home" onClick={()=>{setCategory(0)}}/>
                {/* <div className="rectangle" onClick={goHome}>
            <div className="icon">
                <TiHome />
            </div>                                                    10,15(optional),17,20,22,25,28
            <h2 className="text">                                     ,24,26
                Home
            </h2>
        </div> */}
                <Rectangle icon={SiYoutubeshorts} text="Shorts" onClick={()=>{setCategory(23)}}/>
                <Rectangle icon={MdSubscriptions} text="Subscriptions" />
            </div>
            <hr className="text-black w-5/6"/>

            <div className="you"> 
              <pre> You &gt; </pre>
              <ImageRectangle img="/India.png" text="Indian Content" onClick={ ()=>{setCategory(0);setRegion("IN")} }/>
              <ImageRectangle img="/US.png" text="US Content" onClick={()=>{setCategory(0);setRegion("US")}} />
              <Rectangle icon={GrHistory} text="History"/>
              <Rectangle icon={TbPlaylist} text="Playlists" />
              <Rectangle icon={MdOutlineOndemandVideo} text="Your Videos"/>
              <Rectangle icon={FaRegClock} text="Watch Later"/>
              <Rectangle icon={BiLike} text="Liked Videos"/>
            </div>
            <hr className="text-black w-5/6"/>

            <div className="subscription">
              <pre> Subscriptions </pre>
                <ImageRectangle img="CatCat.png" text="Chai Aur Code"/>
                <ImageRectangle img="Profile.png" text="India Today"/>
                <ImageRectangle img="DogDog.png" text="Thapa Technical"/>
                <ImageRectangle img="Elephant.png" text="Simpli Learn"/>
                <ImageRectangle img="CatCat.png" text="Code With Harry"/>
                <ImageRectangle img="Profile.png" text="Sheriyans"/>
                <ImageRectangle img="CatCat.png" text="Website Learners"/>
                <pre style={{cursor:"pointer"}}> &darr; Show More</pre>
            </div>
            <hr className="text-black w-5/6"/>

            <div className="explore">
              <pre> Explore </pre>

              <Rectangle icon={FaFire} text="Trending"  onClick={()=>{setCategory(24)}}  />
              <Rectangle icon={FaShoppingBag} text="Shopping"/>
              <Rectangle icon={CiMusicNote1} text="Music" onClick={()=>{setCategory(23)}}/>
              <Rectangle icon={PiFilmSlateLight} text="Films" onClick={()=>{setCategory(2)}} />
              <Rectangle icon={IoRadioOutline} text="Live"/>
              <Rectangle icon={SiYoutubegaming} text="Gaming" onClick={()=>{setCategory(20)}} />
              <Rectangle icon={PiNewspaperClipping} text="News" onClick={()=>{setCategory(25)}} />
              <Rectangle icon={CiTrophy} text="Sport" onClick={()=>{setCategory(17)}} />
              <Rectangle icon={LuGraduationCap} text="Courses" onClick={()=>{setCategory(28)}} />
              <Rectangle icon={TbBuildingCircus} text="Fashion & Beauty" onClick={()=>{setCategory(22)}} />
              <Rectangle icon={MdOutlineWifiTethering} text="Products"/>
           
            </div>
            <hr className="text-black w-5/6"/>

            <div className="more">
              <pre> More From YouTube </pre>
              <ImageRectangle img="Youtube_Mobile.png" text="YouTube Premium"/>
              <ImageRectangle img="Youtube_Mobile.png" text="YouTube Studio"/>
              <ImageRectangle img="Youtube_Mobile.png" text="YouTube Music"/>
              <ImageRectangle img="Youtube_Mobile.png" text="YouTube Kids"/>
            </div>
            <hr className="text-black w-5/6"/>

            <div className="settings">
            <Rectangle icon={MdOutlineSettings} text="Settings"/>
            <Rectangle icon={FaRegFlag} text="Report History"/>
            <Rectangle icon={FaRegQuestionCircle} text="Help"/>
            <Rectangle icon={TbMessageReport} text="Send Feedback"/>
            </div>
            <hr className="text-black w-5/6"/>

            <div className="copyrights p-2">
                <p style={{fontSize:".8rem",wordSpacing:"5px"}}> About Press Copyright Contact Us Creator Advertise Developers</p>
                <p style={{fontSize:".8rem",wordSpacing:"5px"}}> Terms Privacy Policy & Safety How YouTube works Test New Features</p>
                <p style={{color:"#717171",fontSize:"small"}}>&copy; 2024 Google LLC </p>
            </div>
        </div>
     
    </>
  )
}

export default LeftSideBar;