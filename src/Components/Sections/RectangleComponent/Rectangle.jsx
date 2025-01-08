import React from 'react'
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
import './Rectangle.css';



const Rectangle = ({icon:Icon,text:Text,onClick}) => {

  // console.log(onClick);



  return (
    <>
        <div className="rectangle" onClick={onClick}>
            <div className="icon">
              {Icon && <Icon />}
            </div>    
            <h2 className="text">
                {Text}
            </h2>
        </div>   
    </>
  )
}

export default Rectangle