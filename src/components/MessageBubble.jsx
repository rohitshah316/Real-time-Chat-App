import React from 'react'
import useAuth from '../hooks/useAuth';

const MessageBubble = ({message}) => {

    const {user}=useAuth();

    const isOwn=message.senderId===user?.uid;

    const formatTime=(timestamp)=>{
        if(!timestamp) return "";

        const date= timestamp.toDate();
        return date.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    }
  return (
    <div className={`flex ${isOwn?'justify-end':'justify-start'} mb-2`}>
        <div  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isOwn? 'bg-green-600 text-white rounded-br-none':'bg-gray-700 text-white rounded-bl-none'}`}>

            {!isOwn && (

                <p className='text-green-400 text-xs font-semibold mb-1' 
                >{message.senderName || "Unknown"}</p>
            )}
            <p className='text-sm'>{message.text}</p>
            <p className='text-xs text-gray-300 text-right mt-1'>{formatTime(message.createdAt)}</p>
        </div>
    </div>
  )
}

export default MessageBubble