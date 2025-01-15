import React , { createContext } from 'react'
import { useState } from 'react';
import './App.css';
import Navbar from './Components/NavbarFolder/Navbar';
import LeftSideBar from './Components/LeftSideBar';
import HeroVideos from './Components/HeroVideos';
// import Video from '.Components/VideoPage/Video';
import Home from './Pages/Home';
import Video from './Pages/Video';
import SearchPage from './Pages/SearchPage';
import PlayListPage from './Pages/PlayListPage';


import { Routes, Route } from 'react-router-dom';


/*
 *                          Creating a Context for 'WRAPPING and UN-WRAPPING' the left-side-bar
*/


const WrapContext = createContext();


const App = () => {

  const [isOpen,setIsOpen] = useState(false); 


  return (
    <>

      <WrapContext.Provider value={{isOpen,fun:setIsOpen}}>
        <Navbar/>
      </WrapContext.Provider>

      <Routes>
          <Route path="/" element={
           <WrapContext.Provider value={{isOpen,fun:setIsOpen}}>
            <Home/>
            </WrapContext.Provider>
          }/>
          <Route path="/video/:region/:categoryId/:videoId/:channelId" element={<Video/>}/>
          <Route path="/search/:query" element={<SearchPage/>}/>
          <Route path="/playlist/:videoId/:PlayListId/:channelId/:title" element={<PlayListPage/> }/>
      </Routes>

    </>
  )
}

export default App;
export {WrapContext}