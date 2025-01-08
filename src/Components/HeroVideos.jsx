import React from 'react'
import { useState, useRef, useContext, useEffect } from 'react';
import { WrapContext } from '../App';
import './HeroVideos.css';
import './HeroVideosMedia.css';
import Thumbnail from './Sections/ThumbnailVideo/Thumbnail';
import { NavLink } from 'react-router-dom';
import moment from 'moment';



const HeroVideos = ({category,region}) => {
  
  
  
  const [thumb,setThumb] = useState([]); 
  const [dupThumb,setDupThumb] = useState([]); 
  const [finalThumb,setFinalThumb] = useState([]);
  // const [category,setCategory] = useState(0);      //23-Shorts
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  // const [region,setRegion] = useState("US");
  const hero = useRef(null);
  
  const content = useContext(WrapContext);
  // console.log(content);
  useEffect(()=>{
        if(content.isOpen){
          if(hero.current){
            hero.current.style.width = "100%";
          }
        }else{
          if(hero.current){
            hero.current.style.width = "calc(100% - 260px)";
          }
          if(media.matches){
            if(hero.current){
              hero.current.style.width = "100%";
            }
          }
        }
    },[content.isOpen]);
    
    
    const media = window.matchMedia("(max-width: 800px)");
    
    const handleMediaChange = (evt)=>{
      // console.log(evt.matches);
    if(evt.matches){
      if(hero.current){
        hero.current.style.width = "100%";
      }
    }else{
      if(hero.current){
        hero.current.style.width = "calc(100% - 260px)";
      }
    }
  }

  media.addEventListener("change", handleMediaChange);
  
  
  // Channel logo 
  //https://www.googleapis.com/youtube/v3/channels?part=snippet&id=UCNZyLULUQBp5e9Q1cKtvk6Q&key=YOUR_API_KEY

  const API_KEY = "AIzaSyCq9pJZX_l2xyr2T0eq3mCXmE5R-ukCB9g";

  const getDetails = async(pageToken)=>{
    try{
      setLoading(true);
      // console.log(category);
      const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=${region}&videoCategoryId=${category}&key=${API_KEY}&pageToken=${pageToken}`;
      let response = await fetch(url); 
      let data = await response.json();
      // console.log("api",data.items);
      setThumb((prev)=>{ return [...prev,data.items] });
      // setDupThumb((prev)=>{ return [...prev,data.items] });
      const nextPageToken = data.nextPageToken;
      if(nextPageToken){
        getDetails(nextPageToken);
      }
    }catch(err){
        setError(true);
        console.log(err);
    }finally{
      setLoading(false);
    }

  }

  useEffect(()=>{ 
    // console.log(category);
    setThumb([]);
    getDetails("");
  },[category,region]);

  // useEffect(()=>{ 
  //   console.log(finalThumb.length);
  // },[thumb]);

  useEffect(()=>{ 
    setThumb([]);
  },[category,region]);
  
  useEffect(()=>{ 
    // console.log(thumb.length);
    // console.log(dupThumb.length);
    // if(thumb.length>4){
    //    thumb = thumb.slice(4);
    // }
    console.log(thumb);
    if(thumb.length>4){
      let temp = thumb.slice(4);
      setThumb(temp);
    }
    
  //  thumb.forEach((cur)=>{
  //       cur.forEach((item,ind)=>{
  //         if(!Array.isArray(item)){
  //           setLoading(true);
  //           // console.log(item.snippet.title);  //title
  //           // console.log(item.snippet.channelTitle); //channel Title
  //           // console.log(item.snippet.categoryId);   //categoryId
  //           // console.log(item.statistics.viewCount); //view
  //           // console.log(item.snippet.thumbnails.standard.url); //thumbImg
  //           // console.log(item.snippet.publishedAt);  //when
  //           // console.log(item.id); //VideoId
  //           // console.log("Next Channel is");
  //           // console.log(item);
  //           let obj = {
  //             VideoId:item.id,
  //             title:item.snippet.title, 
  //             channelTitle:item.snippet.channelTitle,
  //             categoryId:item.snippet.categoryId,
  //             views:item.statistics.viewCount,
  //             // thumbImg:item.snippet.thumbnails.standard.url,
  //             // thumbImg:item.snippet.thumbnails.maxres.url,
  //             thumbImg:item.snippet.thumbnails.medium.url,
  //             when:item.snippet.publishedAt
  //           }
  //           // setFinalThumb((prev)=>{ return [...prev,obj]});
  //           setLoading(false);
  //         }
  //       })
  //  })
  },[thumb]);

  // useEffect(()=>{ 
  //   console.log(finalThumb);

  // },[finalThumb]);





  if(thumb.length===0 || thumb.length>4 || loading){
    return(
      <>
       <div className="hero-section" ref={hero}>
        <Thumbnail/>
        <div>
        <h2 className='rotate mt-12 '></h2>
        </div>
        <Thumbnail/>
        <Thumbnail/>
        <Thumbnail/>
        <Thumbnail/>
        <Thumbnail/>
        <Thumbnail/>
        <Thumbnail/>
        <Thumbnail/>
      </div>
      </>
    )
  }
  if(error){
    return <h1 className='text-red flex items-center justify-center text-5xl m-auto'>Error</h1>
  }

  const calcView = (value)=>{
    if(value>1000000){
      // return value/1000000 + "M";
      return (value/1000000).toFixed(1) + "M";
    }
    if(value>1000){
      // return value/1000 + "K";
      return (value/1000).toFixed(1) + "K";
    }
    return value;
  }
  return (
    <>
       <div className="hero-section" ref={hero}>
        {/* {arr.map((cur,ind)=>{
          return(
              <NavLink to={`/video/${categoryId}/${videoId}`} key={ind} >
                <Thumbnail />
              </NavLink>
          )
        })} */}
        {/* { 
            finalThumb.map((cur,ind)=>{
              return(
                // <NavLink to={`/video/${cur.categoryId}/${cur.VideoId}`} key={ind}>

                // <Thumbnail thumbImg={cur.thumbImg} title={cur.title} channelTitle={cur.channelTitle} views={cur.views} time={cur.when} />

                // </NavLink>
                <NavLink to={`/video/${cur.categoryId}/${cur.VideoId}`} key={ind}>

                   <Thumbnail thumbImg={cur.thumbImg} title={cur.title} channelTitle={cur.channelTitle} views={cur.views} time={cur.when} />

                </NavLink>
              )  
            })
       } */}
        {/* { 
            thumb.map((cur,ind)=>{
              return(
                <NavLink to={`/video/${cur.snippet.categoryId}/${cur.id}`} key={ind}>

                   <Thumbnail thumbImg={cur.snippet.thumbnails.medium.url} title={cur.snippet.title} channelTitle={cur.snippet.channelTitle} views={cur.statistics.viewCount} time={cur.snippet.publishedAt} />

                </NavLink>
              )  
            })
       } */}
       {/* cur.statistics.viewCount */}
        {/* { 
            thumb.map((item)=>{
              return(
                item.map((cur,ind)=>{
                  return (
                      <NavLink to={`/video/${cur.snippet.categoryId}/${cur.id}`} key={ind}>

                        <Thumbnail thumbImg={cur.snippet.thumbnails.medium.url} title={cur.snippet.title.length>60?cur.snippet.title.slice(0,60)+"...":cur.snippet.title } channelTitle={cur.snippet.channelTitle} views={cur.statistics.viewCount} time={cur.snippet.publishedAt} />
                      </NavLink>
                  )
                })
               
              )  
            })
       } */}
        {/* { 
            thumb.map((item)=>{
              return(
                item.map((cur,ind)=>{
                  return (
                      <NavLink to={`/video/${region}/${cur.snippet.categoryId}/${cur.id}`} key={ind}>

                        <Thumbnail thumbImg={cur.snippet.thumbnails.medium.url} title={cur.snippet.title.length>60?cur.snippet.title.slice(0,60)+"...":cur.snippet.title } channelTitle={cur.snippet.channelTitle} views={calcView(cur.statistics.viewCount)} time={cur.snippet.publishedAt} />
                      </NavLink>
                  )
                })
               
              )  
            })
       } */}
        { 
            thumb.map((item)=>{
              return(
                item.map((cur,ind)=>{
                  return (
                      <NavLink to={`/video/${region}/${cur.snippet.categoryId}/${cur.id}/${cur.snippet.channelId}`} key={ind}>

                        <Thumbnail thumbImg={cur.snippet.thumbnails.medium.url} title={cur.snippet.title.length>60?cur.snippet.title.slice(0,60)+"...":cur.snippet.title } channelTitle={cur.snippet.channelTitle} views={calcView(cur.statistics.viewCount)} time={moment(cur.snippet.publishedAt).fromNow()} />
                      </NavLink>
                  )
                })
               
              )  
            })
       }




       </div>
    </>
  )
}

export default HeroVideos