import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import {db,auth} from '../firebase'   
import {query, collection, orderBy, onSnapshot} from 'firebase/firestore'
import SendMessage from './SendMessage';
import styled from 'styled-components';
// import UploadImage from './UploadImage';



const Box = styled.div`
background-color: #000000;
min-height:90vh;
min-width:95vw;
padding-bottom:5rem;
padding-top:1rem;
position:relative;
color: #FFFFFF;
@media (max-width:600px){
    padding-bottom:5rem;
}
`

const Intro = styled.div`
font-family: monospace;
display:flex;
flex-direction: column;
align-items: center;
text-align: center;
justify-content: space-evenly;
min-height:20vh;
width:100%;
background-color:#252525;
`
const FirstMsg = styled.h3`
font-size: 20px;

@media (max-width: 600px) {
    font-size: 16px;
}
`
const SecondMsg = styled.h3`
font-size: 16px;

@media (max-width: 600px) {
    font-size: 12px;
}
`



function Chat() {
    const [messages,setMessages] = useState([]);

    useEffect(() =>{
        const q = query(collection(db, 'messages'),orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (querySnapshot) =>{
            let messages = [];
            querySnapshot.forEach((doc)=>{
                messages.push({...doc.data(), id:doc.id})
            });
            setMessages(messages);
        });
        return () => unsubscribe();

        
    },[]);

    const messagesEndRef = useRef(null);
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({behavior : 'smooth'});
    },[messages])




  return (
        <>
    <Box>
    <Intro>
        <FirstMsg>Hey , {auth.currentUser.displayName} <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="24px" alt="" /> </FirstMsg>
        <SecondMsg>Welcome to superchat. I’ve heard great things about you.🤗</SecondMsg>
    </Intro>
    {/* <UploadImage /> */}
    <div>
    {/* Message Component */}
        {messages &&
        messages.map((message) => (
            <Message key={message.id} message={message} />
        )
        )
        }
    </div>
    {/* Send Message Component */}
    <SendMessage />
        {/* Scroll Component */}
         
    </Box>
        <div className="dummy" ref={messagesEndRef}/>

        </>
  )
}

export default Chat