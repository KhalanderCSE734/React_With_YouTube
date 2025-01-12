import React from 'react'
import { useEffect,useState } from 'react';

import { useParams } from 'react-router-dom';

import './SearchPage.css';
import './SearchPageMedia.css';

const SearchPage = () => {
  const {query} = useParams();

  const [allVideo,setAllVideos] = useState([]);
  const [vidoes,setVideos] = useState([]);
  const [playlist,setPlaylist] = useState([]);
  const [region,setRegion] = useState('');

  const getVideos = async (token="")=>{
      try{
        const API_KEY = "AIzaSyCq9pJZX_l2xyr2T0eq3mCXmE5R-ukCB9g";      
        const URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&key=${API_KEY}`;
        const response = await fetch(URL);
        const video = await response.json();
        // console.log(video);
        // console.log(video.regionCode);
        setRegion(video.regionCode);
        setAllVideos(video.items);
      }catch(error){
        console.log(error);
      }
  }

  useEffect(()=>{ 
    // getVideos();
  },[]);

  useEffect(()=>{ 
    allVideo.forEach((cur)=>{
      console.log('videoId' in cur.id);
    })
    let vd = allVideo.filter((cur)=>{
      return 'videoId' in cur.id;
    })
    let pd = allVideo.filter((cur)=>{
      return 'playlistId' in cur.id;
    })
    setVideos(vd);
    setPlaylist(pd);
  },[allVideo]);
  
  useEffect(()=>{ 
    console.log(vidoes);
    console.log(playlist);
  },[vidoes,playlist]);


  let arr = [0,23,24,2,20,25,17,28,22];
  console.log(Math.floor(Math.random()*arr.length));
  return (
    <>
        {/* <h2 className="text-5xl text-red-400">Your Searched Content is {query}</h2>    */}
        <div className="hero-container">
        <div className="Wrapper-box">
          <img src="/Doraemon.png" alt="" />
          <div className="desc">
            <h1 className="title"> All new episodes of Doraemon</h1>
            <p className="when"> 2 Days Ago </p>
            <p className="title"> <img src="/Doraemon.png" alt="" /> <span>Doraemon</span> </p>
            <p className="short-desc"> Doraemon is Started from Japan and Now It reached India So great and Everybody watch and Support</p>
          </div>
        </div>
        </div>
    </>
  )
}

export default SearchPage;