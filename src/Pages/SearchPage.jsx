import React from 'react'
import { useEffect,useState } from 'react';

import { useParams } from 'react-router-dom';

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
    getVideos();
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

  return (
    <>
        <h2 className="text-5xl text-red-400">Your Searched Content is {query}</h2>   
        <div className="Wrapper-box">
          {/* <img src="" alt="" /> */}
          <div className="desc"></div>
        </div>
    </>
  )
}

export default SearchPage;