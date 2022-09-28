import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import {db} from '../firebase'
import {query, collection, orderBy, onSnapshot} from 'firebase/firestore'
import SendMessage from './SendMessage';
import styled from 'styled-components';
// import UploadImage from './UploadImage';



const Box = styled.div`
background-color: #000000;
min-height:90vh;
min-width:100vw;
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
min-height:25vh;
width:100%;
background-color:#252525;
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
    // console.log(messages);




  return (
    <Box>
    <Intro>
        <h2>Superchat 🚀 </h2>
        <h3>Welcome to superchat. 🤗</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat illo minima nostrum, dicta soluta possimus cum nemo omnis fugiat placeat.</p>
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
        <div className="dummy" ref={messagesEndRef}/>
         
    </Box>
  )
}

export default Chat