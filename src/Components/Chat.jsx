import React, { useEffect, useState } from 'react'
import Message from './Message'
import {db} from '../firebase'
import {query, collection, orderBy, onSnapshot} from 'firebase/firestore'
import SendMessage from './SendMessage';
import styled from 'styled-components';



const Box = styled.div`
background-color: #000000;
min-height:100vh;
min-width:100vw;
padding-bottom:10%;
position:relative;
color: #FFFFFF;
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
    // console.log(messages);




  return (
    <Box>
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
  )
}

export default Chat