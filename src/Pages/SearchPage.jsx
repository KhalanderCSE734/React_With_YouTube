import React from 'react'
import { useEffect,useState } from 'react';

import { Link, NavLink, useParams } from 'react-router-dom';

import moment from 'moment';


import './SearchPage.css';
import './SearchPageMedia.css';
import Video from './Video';



const SearchPage = () => {
  const {query} = useParams();

  const [allVideo,setAllVideos] = useState([]);
  const [videos,setVideos] = useState([]);
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
  },[query]);

  useEffect(()=>{ 
    allVideo.forEach((cur)=>{
      // console.log('videoId' in cur.id);
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
    // console.log(videos);
    // console.log(playlist);
    // if(videos.length>0){
    //   console.log(region,videos[0].id.videoId,videos[0].snippet.channelId);
    // }
    // console.log(videos,playlist);
  },[videos,playlist]);


  let arr = [0,23,24,2,20,25,17,28,22];
  const category = Math.floor(Math.random()*arr.length);
  if(allVideo.length<0 || (videos.length<0 && playlist.length<0)){
    return <h1 className='text-white flex items-center justify-center text-5xl m-auto'>Loading</h1>;
  }
  const tempId = 0;
  // const tempId = "xvm3X1oyTL8";
  return (
    <>
        {/* <h2 className="text-5xl text-red-400">Your Searched Content is {query}</h2>  
        
        cur.snippet.thumbnails.medium.url     --> Thumbnail
        cur.snippet.title                     -->title
        cur.snippet.publishedAt               -->when (moments)
        cur.snippet.channelTitle
        cur.snippet.description.slice(0,50)

        
        */}
        <div className="hero-container">
    {/* {
      vidoes.map((cur,ind)=>{
        return   <NavLink to={`/video/${region}/${Math.floor(Math.random()*arr.length)}/${cur.id.videoId}/${cur.snippet.channelId}`} key={ind}>
        <div className="Wrapper-box">
          <img src="/Doraemon.png" alt="" />
          <div className="desc">
            <h1 className="title"> All new episodes of Doraemon</h1>
            <p className="when"> 2 Days Ago </p>
            <p className="title"> <img src="/Doraemon.png" alt="" /> <span>Doraemon</span> </p>
            <p className="short-desc"> Doraemon is Started from Japan and Now It reached India So great and Everybody watch and Support</p>
          </div>
        </div>
      </NavLink>
      })
    } */}
    {
      videos.map((cur,ind)=>{
        return   <NavLink to={`/video/${region}/${arr[category]}/${cur.id.videoId}/${cur.snippet.channelId}`} key={ind}>
        <div className="Wrapper-box">
          <img src={cur.snippet.thumbnails.medium.url} alt="" />
          <div className="desc">
            <h1 className="title"> {cur.snippet.title}</h1>
            <p className="when"> {moment(cur.snippet.publishedAt).fromNow()} </p>
            <p className="title"> <img src={cur.snippet.thumbnails.medium.url} alt="" /> <span>{cur.snippet.channelTitle}</span> </p>
            <p className="short-desc">{cur.snippet.description.slice(0,50)}</p>
          </div>
        </div>
      </NavLink>
      })
    }
    {
      playlist.map((cur,ind)=>{
        return <NavLink to={`/playlist/${tempId}/${cur.id.playlistId}/${cur.snippet.channelId}/${cur.snippet.title}`} key={ind}>
            <div className="Wrapper-box">
            <img src={cur.snippet.thumbnails.medium.url} alt="" />
            <div className="desc">
              <h1 className="title"> {cur.snippet.title} </h1>
              <p className="title"> <span>{cur.snippet.channelTitle}</span> &#xB7; <span>Playlist</span> </p>
              <p className="short-desc"> {cur.snippet.description.slice(0,50)}</p>
              <p> View Full Playlist </p>
            </div>
          </div>
        </NavLink>
      })
    }
   
        {/* <div className="Wrapper-box">
          <img src="/Doraemon.png" alt="" />
          <div className="desc">
            <h1 className="title"> All new episodes of Doraemon</h1>
            <p className="title"> <span>Doraemon</span> &#xB7; <span>Playlist</span> </p>
            <p className="short-desc"> Doraemon is Started from Japan and Now It reached India So great and Everybody watch and Support</p>
            <p> View Full Playlist </p>
          </div>
        </div> */}

        </div>
    </>
  )
}

export default SearchPage;