import React, { useEffect, useState,useRef } from 'react'
import { listenMessages } from '../services/chatService';
import MessageBubble from './MessageBubble';

const MessageList = () => {

    const [messages,setMessages]=useState([]);
    const bottomRef=useRef(null);

    useEffect(()=>{
        const unsubscribe=listenMessages((newMessages)=>{
            setMessages(newMessages);
        });

        return ()=>unsubscribe();
    },[])

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior:'smooth'});
    },[messages])

  return (
    <div className='flex-1 overflow-y-auto px-4 py-4 bg-gray-900'>
        {messages.length===0 && (
            <p>No messages yet.</p>
        )}

        {messages.map((message)=>(
            <MessageBubble key={message.id} message={message}/>
        ))}
        <div ref={bottomRef}/>
    </div>
  )
}

export default MessageList