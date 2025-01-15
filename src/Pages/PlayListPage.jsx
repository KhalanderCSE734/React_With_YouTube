import React from 'react'
import { useState, useEffect } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import moment from 'moment';

import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { IoIosShareAlt } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";


import './PlayListPage.css';

/*
&hellip;      '...' three horizontal dots
&#8285;       '.' vertical three dots

*/



/*

https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${content}&maxResults=50&key=${key}&pageToken=${token}


*/



 
 
const PlayListPage = () => {

  const {videoId,PlayListId,channelId,title} = useParams();


  // console.log("PlayListpage is working fine");
  // console.log(videoId);

  // const [data,setData] = useState([]);
  // console.log(categoryId,videoId);
  const [video,setVideo] = useState([]);
  const [finalVideo,setFinalVideo] = useState([]);
  const [comment,setComment] = useState([]);
  const [suggestion,setSuggestion] = useState([]);
  const [channel,setChannel] = useState(null);

  const [load,setLoad] = useState(true);

  // const [cheatState,setCheatState] = useState(true);


  const API_KEY = "AIzaSyCq9pJZX_l2xyr2T0eq3mCXmE5R-ukCB9g";

  const getVideoDetails = async (token="")=>{
    try{  
      // let  URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&maxResults=50&key=${API_KEY}`;
      //             https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&maxResults=50&key=${API_KEY}
      if(videoId==0){
        let URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${PlayListId}&maxResults=1&key=${API_KEY}`;
        const response = await fetch(URL);
        const responseData = await response.json();
        // console.log("Video Details \n",responseData.items[0]); 
        setVideo(responseData.items[0])
        return;
      }
      
      let URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${PlayListId}&maxResults=50&key=${API_KEY}&pageToken=${token}`;
      const response = await fetch(URL);
      const responseData = await response.json();
      // console.log("Video Details \n",responseData); 
      // setVideo(responseData);
      // setVideo(responseData.items); 
      responseData.items.forEach((cur,ind)=>{
        if(cur.contentDetails.videoId==videoId){
          setVideo(cur);
          // console.log('Video Of the Page',cur);
          return;
        }
      })
      // setVideo(responseData.items);    //Here we are getting only one video detail
      // console.log(responseData.items[0].snippet.channelId);
      if(responseData.nextPageToken){
          getVideoDetails(responseData.nextPageToken);
      } 
    }catch(err){
          //  setError(true);
           console.log(err);
    }

  }

  const getComments = async ()=>{
    try{
      if(videoId!=0){
        //                https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}
        let commentURL = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
        const response = await fetch(commentURL);
        const responseData = await response.json();
        // console.log("Comment Details are ",responseData.items);
        setComment(responseData.items);
        return;
      }
      if(video.length!=0){
        let commentURL = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${video.contentDetails.videoId}&key=${API_KEY}`
        const response = await fetch(commentURL);
        const responseData = await response.json();
        // console.log("Comment Details are ",responseData.items);
        setComment(responseData.items);
        return;
      }
      // console.log("Comment Details \n",responseData); 
      // console.log("Comment Details \n",responseData.items); 
      // setComment(responseData);
      // setComment((prev)=>{ return [...prev,...responseData.items] });
      // const nextPageToken = responseData.nextPageToken;
      // console.log(nextPageToken);
      // if(nextPageToken && comment.length<20){
      //    getComments(nextPageToken);
      // }
    }catch(err){
          //  setError(true);
           console.log(err.message);
    }
  }

  const getPlayListVideos = async (PlayListId,pageToken="")=>{
    try{
      // const suggestionURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=${region}&videoCategoryId=${categoryId}&key=${API_KEY}&pageToken=${pageToken}`;
      // let response = await fetch(suggestionURL); 
      // let data = await response.json();
      // // console.log("Suggestion Video Details \n",data.items);
      // // setSuggestion(data);
      // // setSuggestion(data.items); 
      // setSuggestion((prev)=> [...prev,...data.items]); 
      // const nextPageToken = data.nextPageToken;
      // if(nextPageToken){
      //   getSuggestionVideos(nextPageToken);
      // }
      const response =  await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${PlayListId}&maxResults=50&key=${API_KEY}&pageToken=${pageToken}`);
      const data = await response.json();
      // console.log("Sugesstion Plyalist (Same Plylist)",data);
      setSuggestion((prev)=> [...prev,...data.items]);
      if(data.nextPageToken){
          // console.log(data.nextPageToken);
          getPlayListVideos(PlayListId,data.nextPageToken);
      }
    }catch(err){
        console.log(err);
    }
  }

  const getChannelDetails = async ()=>{
    try{
      setLoad(true);
      const subURL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`;
      const response = await fetch(subURL);
      const data = await response.json();
      // console.log(data);
      // console.log("\nChannel Details are ",data.items[0]);
      setChannel(data.items[0]);
      // console.log(data.items[0].snippet.thumbnails.medium.url);
      setLoad(false);
    }catch(error){
      console.log(error);
    }
  }

  const getFinalVideoDetails = async ()=>{
    if(video.length!=0){
      let  URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${video.contentDetails.videoId}&maxResults=50&key=${API_KEY}`;
      const response = await fetch(URL);
        const responseData = await response.json();
        // console.log(" Final Video Details \n",responseData.items[0]);
        setFinalVideo(responseData.items[0]);
    }
  }



  useEffect(()=>{ 
    getVideoDetails();           // This thing Doesn't have 'Statistics' object because of which I'm Initialising one more State named 'finalVideoDetails' 
     getChannelDetails();
    setSuggestion([]);
    getPlayListVideos(PlayListId,"");
  },[videoId]);

  useEffect(()=>{ 
      getComments();
      getFinalVideoDetails();
  },[video]);

 
  useEffect(()=>{ 
    console.log(suggestion);
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

  if(video.length==0 || comment.length==0 || suggestion.length==0 ){
    return <h1 className='text-white flex items-center justify-center text-5xl m-auto'>Loading... </h1>;
  }

  // let arr = [];
  // for(let i=0;i<10;i++){
  //   arr[i] = 0;   
  // }

  // if(!channel){
  //   return <h1 className='text-white flex items-center justify-center text-5xl m-auto'>Loading</h1>;
  // }

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

          

              <iframe
                src={`https://www.youtube.com/embed/${video.contentDetails.videoId}?autoplay=1`}
                title="YouTube video player"
                style={{ border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              
             

               {/* <video src="/SampleVideo.mp4" width="400px" controls autoPlay> </video> */}
              <h1>{video.snippet.title} </h1>
              {/* <h1>Watch Doraemon's All new Episodes in This playlist | Doraemon in Hindi </h1> */}
              <div className="about-video">
                <div className="about-video-left">
                  <img src={channel.snippet.thumbnails.medium.url?channel.snippet.thumbnails.medium.url:video.snippet.thumbnails.medium.url} alt="Doraemon" />
                  {/* <img src="/Doraemon.png" alt="Doraemon" /> */}
                   <div className="channel">
                    <p>{video.snippet.channelTitle}</p>
                    {/* <p>Doraemon</p> */}
                    <h3>{channel?calcCount(channel.statistics.subscriberCount):"2.5M"} <span> subscribers</span></h3>
                    {/* <h3>20k <span> subscribers</span></h3> */}
                   </div>
                   <button> Subscribe </button>
                </div>
                <div className="about-video-right">
                  <div className="like-section">
                        <AiOutlineLike/>   {calcCount(finalVideo.statistics.likeCount)}   <BiDislike/> 
                        {/* <AiOutlineLike/>  300k <BiDislike/>  */}
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
                  <p className='mb-3'> {calcCount(finalVideo.statistics.viewCount)} veiws - {moment(finalVideo.snippet.publishedAt).fromNow()} </p>
                  {/* <p className='mb-3'> 1M veiws - 3 months ago </p> */}
                  {finalVideo.snippet.description}
                  {/* Video Description Goes here */}
              </div>
              <p style={{fontSize:"1.5rem",fontWeight:"bolder",marginTop:"10px"}}>{finalVideo.statistics.commentCount} Comments</p>
              {/* <p style={{fontSize:"1.5rem",fontWeight:"bolder",marginTop:"10px"}}>5000 Comments</p> */}
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
          <h1 className='text-[1.2rem]'>{title}</h1>
          <h1 className='text-[1.2rem]'>Complete Playlist</h1>
            {
              suggestion.map((cur,ind)=>{
                    return   <NavLink to={`/playlist/${cur.contentDetails.videoId}/${cur.snippet.playlistId}/${cur.snippet.channelId}/${cur.snippet.title}`} key={ind} className="thumbnail-container">
                    <img src={cur.snippet.thumbnails.medium.url} alt="ShinChan" />
                    <div className="desc">
                      <h2> {cur.snippet.title.slice(0,60)} </h2>
                      <p> {cur.snippet.channelTitle} </p>
                      {/*  <p>{calcCount(cur.statistics.viewCount)} views  &#xB7; <span className="added"> {moment(cur.snippet.publishedAt).fromNow()} </span></p> */}
                    </div>
                  </NavLink>
              })
            } 
              {/* <h1 className='text-[1.2rem]'>{title}</h1> */}
              {/* <h1 className='text-[1.2rem]'>Shinchan and Doraemon New Playlist</h1> */}

             {/* <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                </div>
              </div>
              <div className="thumbnail-container">
                <img src="/Shinchan.png" alt="ShinChan" />
                <div className="desc">
                  <h2> Shinchan New Episodes on YouTube | Harry Aur Mixi ke saath Shiro </h2>
                  <p> Shinchan </p>
                </div>
              </div> */}
              
          </div>

       </div>
    </>
  )
}

export default PlayListPage