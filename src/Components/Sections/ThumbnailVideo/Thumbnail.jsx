import React from 'react'
import './Thumbnail.css'
import './ThumbnailMedia.css';

// const Thumbnail = () => {
//   return (
//     <div className="main-box">
//         <img className="ThumbImg" src="Doraemon.png" alt="" />
//         <div className="description">
//             <img src="CatCat.png" alt=""></img>
//             <div className="title-box">
//                 <h1 className="title"> Doraemon All Popular Song  Plyalist|| Best Song of Doraemon...  </h1>
//                 <p className="channel-name"> Doraemon For Kids </p>
//                 <p className="views"> 878K views  &#xB7; <span className="added"> 1 year ago </span></p>
//             </div>
//             <div className="dot">&#x205D;</div>
//         </div>
//     </div>
//   )
// }


// const Thumbnail = ({thumbImg,title,channelTitle,views,time}) => {
//   return (
//     <div className="main-box">
//         <img className="ThumbImg" src={thumbImg} alt="" />
//         <div className="description">
//             <img src={thumbImg} alt=""></img>
//             <div className="title-box">
//                 <h1 className="title"> {title}</h1>
//                 <p className="channel-name"> {channelTitle} </p>
//                 <p className="views"> {views} views  &#xB7; <span className="added"> {time} </span></p>
//             </div>
//             <div className="dot">&#x205D;</div>
//         </div>
//     </div>
//   )
// }

// export default Thumbnail



const Thumbnail = ({thumbImg="/BlankThumb.png",title="Loading Your Videos....",channelTitle="This may take a while",views="",time=""}) => {
  return (
    <div className="main-box">
        <img className="ThumbImg" src={thumbImg} alt="" />
        <div className="description">
            <img src={thumbImg} alt=""></img>
            <div className="title-box">
                <h1 className="title"> {title}</h1>
                <p className="channel-name"> {channelTitle} </p>
                <p className="views"> {views} views  &#xB7; <span className="added"> {time} </span></p>
            </div>
            <div className="dot">&#x205D;</div>
        </div>
    </div>
  )
}

export default Thumbnail