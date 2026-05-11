import React, { useEffect, useState,useRef } from 'react'
import { listenMessages } from '../services/chatService';
import MessageBubble from './MessageBubble';
import useAuth from '../hooks/useAuth'

const MessageList = () => {

    const [messages,setMessages]=useState([]);
    const bottomRef=useRef(null);
    const isFirstLoad=useRef(null);
    const prevMessageCountRef=useRef(0);
    const {user}=useAuth();

    const playNotificationSound=()=>{
        const audioContext= new(window.AudioContext || window.webkitAudioContext)();
        const oscillator= audioContext.createOscillator();
        const gainNode=audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value=800;
        oscillator.type='sine';

        gainNode.gain.setValueAtTime(0.3,audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime+0.3);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime+0.3);
    }


    useEffect(()=>{
        const unsubscribe=listenMessages((newMessages)=>{
            if(isFirstLoad.current){
                isFirstLoad.current=false;
                prevMessageCountRef.current=newMessages.length;
                
            
            setMessages(newMessages);
            return;
            }

            if(newMessages.length>prevMessageCountRef.current){
                const latestMessage=newMessages[newMessages.length-1];

                if(latestMessage.senderId!==user?.uid){
                    playNotificationSound();
                }
            }
            prevMessageCountRef.current=newMessages.length;
            setMessages(newMessages)
        });

        return ()=>unsubscribe();
    },[user])

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior:'smooth'});
    },[messages])

  return (
    <div className='flex-1 overflow-y-auto px-4 py-4 bg-gray-900'>
        {messages.length===0 && (
            <p className='text-white'>No messages yet.</p>
        )}

        {messages.map((message)=>(
            <MessageBubble key={message.id} message={message}/>
        ))}
        <div ref={bottomRef}/>
    </div>
  )
}

export default MessageList