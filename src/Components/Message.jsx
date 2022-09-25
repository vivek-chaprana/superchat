import React, { useEffect, useRef } from 'react'
import {auth} from  '../firebase'




const Message = ({message}) => {



  message.uid === auth.currentUser.uid ? console.log('1') : console.log(0)
  return (
    <>
      <div className="centerDiv">

    <div className={message.uid === auth.currentUser.uid ? 'mine' : 'enemy'}>
    <div className={message.uid === auth.currentUser.uid ? 'mineMsg' : 'enemyMsg'}  >
    <p className="name">{message.name}</p>
    <div className={message.uid === auth.currentUser.uid ? 'myImgAndText' : 'enemyImgAndText'}>
    <img className="profileImg" src={message.photo} alt="" />
    <div className={message.uid === auth.currentUser.uid ? 'myText text' : 'enemyText text'}>
    <p>
    {message.text}
    </p>
    </div>
    </div>
    </div>
    </div>
      </div>
    
    </>
  )
}

export default Message