import React from 'react'
import './ImageRectangle.jsx'
const ImageRectangle = ({img:Image,text:Text,onClick}) => {
  return (
    <>
        <div className="rectangle" onClick={onClick}>
                    <div className="image">
                        <img src={Image} alt={Image} />
                    </div>    
                    <h2 className="text">
                        {Text}
                    </h2>
        </div>  
    </>
  )
}

export default ImageRectangle