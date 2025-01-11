import React from 'react'
import { useState, useEffect } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import moment from 'moment';

import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { IoIosShareAlt } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";


import './Video.css';
import './VideoMedia.css';



/*
&hellip;      '...' three horizontal dots
&#8285;       '.' vertical three dots

*/




 
const Video = () => {

  const {region,categoryId,videoId,channelId} = useParams();

  // const [data,setData] = useState([]);
  // console.log(categoryId,videoId);
  const [video,setVideo] = useState([]);
  const [comment,setComment] = useState([]);
  const [suggestion,setSuggestion] = useState([]);
  const [channel,setChannel] = useState(null);

  const [load,setLoad] = useState(true);

  // const [cheatState,setCheatState] = useState(true);


  const API_KEY = "AIzaSyCq9pJZX_l2xyr2T0eq3mCXmE5R-ukCB9g";

  const getVideoDetails = async ()=>{
    try{  
      let  URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&maxResults=50&key=${API_KEY}`;
      const response = await fetch(URL);
      const responseData = await response.json();
      // console.log("Video Details \n",responseData); 
      // setVideo(responseData);
      // setVideo(responseData.items);
      setVideo(responseData.items[0]);    //Here we are getting only one video detail
      // console.log(responseData.items[0].snippet.channelId);
    }catch(err){
           setError(true);
           console.log(err);
    }

  }

  const getComments = async (pageToken="")=>{
    try{
      let commentURL = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}&pageToken=${pageToken}`
      const response = await fetch(commentURL);
      const responseData = await response.json();
      // console.log("Comment Details \n",responseData); 
      // console.log("Comment Details \n",responseData.items); 
      // setComment(responseData);
      // setComment(responseData.items);
      setComment((prev)=>{ return [...prev,...responseData.items] });
      const nextPageToken = responseData.nextPageToken;
      // console.log(nextPageToken);
      // if(nextPageToken && comment.length<20){
      //    getComments(nextPageToken);
      // }
    }catch(err){
           setError(true);
           console.log(err.message);
    }
  }

  const getSuggestionVideos = async (pageToken="")=>{
    try{
      const suggestionURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=${region}&videoCategoryId=${categoryId}&key=${API_KEY}&pageToken=${pageToken}`;
      let response = await fetch(suggestionURL); 
      let data = await response.json();
      // console.log("Suggestion Video Details \n",data.items);
      // setSuggestion(data);
      // setSuggestion(data.items); 
      setSuggestion((prev)=> [...prev,...data.items]); 
      const nextPageToken = data.nextPageToken;
      if(nextPageToken){
        getSuggestionVideos(nextPageToken);
      }
    }catch(err){
        console.log(err);
    }
  }

  const getChannelDetails = async ()=>{
    try{
      setLoad(true);
      const subURL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${video.snippet.channelId}&key=${API_KEY}`;
      const response = await fetch(subURL);
      const data = await response.json();
      // console.log(data);
      // console.log(data.items[0]);
      setChannel(data.items[0]);
      // console.log(data.items[0].snippet.thumbnails.medium.url);
      setLoad(false);
    }catch(error){
      console.log(error);
    }
  }




  useEffect(()=>{ 
    getVideoDetails();
    getComments();
    getSuggestionVideos();
  },[videoId]);

  useEffect(()=>{ 
    if(video.length!=0){
      getChannelDetails();
    }
  },[video]);


  useEffect(()=>{ 
    // console.log(suggestion);
  },[suggestion]);

  useEffect(()=>{
      // console.log("Video Details \n",video)
      // console.log("Comments Section \n",comment);
      // console.log("Suggestion Videos \n",suggestion); 
      // console.log("Channel Id\n",channelId); 
      // console.log(video.snippet.title);
      // if(comment.length>0){
      //   console.log(comment[0].snippet.topLevelComment.snippet.authorDisplayName);
      //   // console.log(comment);
      // }
      // console.log(suggestion);
      /*
          Video
          title: .snippets.title
          channelTitle: .snippet.channelTitle
          like: .statistics.likeCount
          view: .statistics.viewCount
          when?: .snippet.publishedAt
          commentCount: .statistics.commentCount
          description: .snippet.description

          Comment Part
          number: available in Video part
          userName: cur[i].snippet.topLevelComment.snippet.authorDisplayName
          userProfile: cur[i].snippet.topLevelComment.snippet.authorProfileImageUrl
          Comment: cur[i].snippet.topLevelComment.snippet.textOriginal
          when? : cur[i].snippet.topLevelComment.snippet.publishedAt
          like : cur[i].snippet.topLevelComment.snippet.likeCount



          Suggestion Videos part

          title:item.snippet.title, 
          channelTitle:item.snippet.channelTitle,
          views:item.statistics.viewCount,
          thumbImg:item.snippet.thumbnails.medium.url,
          when:item.snippet.publishedAt


          Tags Are available    //HashTags


      */
       
  },[video,comment,suggestion]);

  /*
  //                  Setting null for intial data for 'API' data might be helpful
  */

  if(video.length==0 && comment.length==0 && suggestion.length==0 ){
    return <h1 className='text-white flex items-center justify-center text-5xl m-auto'>Loading</h1>;
  }

  let arr = [];
  for(let i=0;i<10;i++){
    arr[i] = 0;   
  }

  if(!channel){
    return <h1 className='text-white flex items-center justify-center text-5xl m-auto'>Loading</h1>;
  }

  const calcCount = (value)=>{
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
       <div className="video-container">

          <div className="main-video">
              {/* <video src="/SampleVideo.mp4" width="400px" controls autoPlay> </video> */}

              <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen autoPlay></iframe>

              <h1>{video.snippet.title} </h1>
              <div className="about-video">
                <div className="about-video-left">
                  <img src={channel.snippet.thumbnails.medium.url?channel.snippet.thumbnails.medium.url:video.snippet.thumbnails.medium.url} alt="Doraemon" />
                   <div className="channel">
                    <p>{video.snippet.channelTitle}</p>
                    <h3>{channel?calcCount(channel.statistics.subscriberCount):"2.5M"} <span> subscribers</span></h3>
                   </div>
                   <button> Subscribe </button>
                </div>
                <div className="about-video-right">
                  <div className="like-section">
                        <AiOutlineLike/>   {calcCount(video.statistics.likeCount)}   <BiDislike/> 
                  </div>
                  <div className="share">
                  <IoIosShareAlt /> Share
                  </div>
                  <div className="download">
                  <MdOutlineFileDownload /> Download
                  </div>
                  <div className="horizontal-dot">
                      &hellip;
                  </div>
                </div>
              </div>
              <div className="description">
                  <p className='mb-3'> {calcCount(video.statistics.viewCount)} veiws - {moment(video.snippet.publishedAt).fromNow()} </p>
                  {video.snippet.description}
              </div>
              <p style={{fontSize:"1.5rem",fontWeight:"bolder",marginTop:"10px"}}>{video.statistics.commentCount} Comments</p>
              <div className="comments-section">

                    <div className="your-comment">
                        <img src="/Profile.png" alt="Profile" />
                        <input type="text" name="comment" placeholder='Your Comment' />
                        <button> Comment </button>
                    </div>
                    {
                      comment.map((cur,ind)=>{
                        return(
                          <div className="your-comment people-comment" key={ind}>
                        <img src={cur.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="Profile" />
                        <div className="main-comment">
                          <div className="name"> {cur.snippet.topLevelComment.snippet.authorDisplayName}  ___     {moment(cur.snippet.topLevelComment.snippet.publishedAt).fromNow()}</div>
                          <p className='h-14 overflow-auto mb-1 mt-1 '>{cur.snippet.topLevelComment.snippet.textOriginal}</p>
                          <div className="like">
                          <AiOutlineLike/>   {cur.snippet.topLevelComment.snippet.likeCount}   <BiDislike/>  Reply
                          </div>
                        </div>
                        <div className="horizontal-dot" style={{marginLeft:"10px"}}> &#8285;   </div>
                        </div>
                        )
                       })
                    }
                    {/* <div className="your-comment people-comment">
                        <img src="/Unkown.png" alt="Profile" />
                        <div className="main-comment">
                          <div className="name"> Shailesh 3 months ago</div>
                          <p>I have watched this video It was really superb thank you so much. </p>
                          <div className="like">
                          <AiOutlineLike/>   6.5K   <BiDislike/>  Reply
                          </div>
                        </div>
                        <div className="horizontal-dot" style={{marginLeft:"10px"}}> &#8285;   </div>
                    </div>
                    <div className="your-comment people-comment">
                        <img src="/Unkown.png" alt="Profile" />
                        <div className="main-comment">
                          <div className="name"> Shailesh 3 months ago</div>
                          <p>I have watched this video It was really superb thank you so much. </p>
                          <div className="like">
                          <AiOutlineLike/>   6.5K   <BiDislike/>  Reply
                          </div>
                        </div>
                        <div className="horizontal-dot" style={{marginLeft:"10px"}}> &#8285;   </div>
                    </div>
                    <div className="your-comment people-comment">
                        <img src="/Unkown.png" alt="Profile" />
                        <div className="main-comment">
                          <div className="name"> Shailesh 3 months ago</div>
                          <p>I have watched this video It was really superb thank you so much. </p>
                          <div className="like">
                          <AiOutlineLike/>   6.5K   <BiDislike/>  Reply
                          </div>
                        </div>
                        <div className="horizontal-dot" style={{marginLeft:"10px"}}> &#8285;   </div>
                    </div>
                    <div className="your-comment people-comment">
                        <img src="/Unkown.png" alt="Profile" />
                        <div className="main-comment">
                          <div className="name"> Shailesh 3 months ago</div>
                          <p>I have watched this video It was really superb thank you so much. </p>
                          <div className="like">
                          <AiOutlineLike/>   6.5K   <BiDislike/>  Reply
                          </div>
                        </div>
                        <div className="horizontal-dot" style={{marginLeft:"10px"}}> &#8285;   </div>
                    </div>
                    <div className="your-comment people-comment">
                        <img src="/Unkown.png" alt="Profile" />
                        <div className="main-comment">
                          <div className="name"> Shailesh 3 months ago</div>
                          <p>I have watched this video It was really superb thank you so much. </p>
                          <div className="like">
                          <AiOutlineLike/>   6.5K   <BiDislike/>  Reply
                          </div>
                        </div>
                        <div className="horizontal-dot" style={{marginLeft:"10px"}}> &#8285;   </div>
                    </div> */}

              </div>
          </div>

          <div className="suggestion-videos">

            {
              suggestion.map((cur,ind)=>{
                    return   <NavLink to={`/video/${region}/${cur.snippet.categoryId}/${cur.id}/${cur.snippet.channelId}`} key={ind} className="thumbnail-container">
                    <img src={cur.snippet.thumbnails.medium.url} alt="ShinChan" />
                    <div className="desc">
                      <h2> {cur.snippet.title.slice(0,60)} </h2>
                      <p> {cur.snippet.channelTitle} </p>
                      <p>{calcCount(cur.statistics.viewCount)} views  &#xB7; <span className="added"> {moment(cur.snippet.publishedAt).fromNow()} </span></p>
                    </div>
                  </NavLink>
              })
            }
              {/* <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                  <p>878K views  &#xB7; <span className="added"> 1 year ago </span></p>
                </div>
              </div> */}
              {/* <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                  <p>878K views  &#xB7; <span className="added"> 1 year ago </span></p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                  <p>878K views  &#xB7; <span className="added"> 1 year ago </span></p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                  <p>878K views  &#xB7; <span className="added"> 1 year ago </span></p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                  <p>878K views  &#xB7; <span className="added"> 1 year ago </span></p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                  <p>878K views  &#xB7; <span className="added"> 1 year ago </span></p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                  <p>878K views  &#xB7; <span className="added"> 1 year ago </span></p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                  <p>878K views  &#xB7; <span className="added"> 1 year ago </span></p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                  <p>878K views  &#xB7; <span className="added"> 1 year ago </span></p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                  <p>878K views  &#xB7; <span className="added"> 1 year ago </span></p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                  <p>878K views  &#xB7; <span className="added"> 1 year ago </span></p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                  <p>878K views  &#xB7; <span className="added"> 1 year ago </span></p>
                </div>
              </div> */}
          </div>

       </div>
    </>
  )
}

export default Video