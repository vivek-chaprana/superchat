import React, { useEffect, useRef } from 'react'
import {auth} from  '../firebase'




const Message = ({message}) => {
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior : 'smooth'});
  },[message])


  message.uid === auth.currentUser.uid ? console.log('1') : console.log(0)
  return (
    <>
      <div className="centerDiv">

    <div className={message.uid === auth.currentUser.uid ? 'mine' : 'enemy'}>
    <div className={message.uid === auth.currentUser.uid ? 'mineMsg' : 'enemyMsg'}  >
    <p className="name">{message.name}</p>
    <div className={message.uid === auth.currentUser.uid ? 'myImgAndText' : 'enemyImgAndText'}>
    <img className="profileImg" src={message.photo} alt="" />
    <div className={message.uid === auth.currentUser.uid ? 'myText text' : 'enemyText text'}>{message.text}</div>
    </div>
    </div>
    </div>
      </div>
    <div ref={messagesEndRef}/>
    </>
  )
}

export default Message