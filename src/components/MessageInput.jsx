import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';
import {sendMessage} from '../services/chatService'

const MessageInput = () => {

    const [text,setText]=useState("");
    const [loading,setLoading]=useState(false);
    const {user} = useAuth();


    const handleSend=async(e)=>{
        e.preventDefault();
        if(!text.trim()) return;

        setLoading(true);

        try{
            await sendMessage(text.trim(),user);
            setText("");
        }catch(err){
            console.error("Failed to send message:",err);
        }finally{
            setLoading(false);
        }
    }


    const handleKeyDown=(e)=>{
        if(e.key==="Enter" && !e.shiftKey){
            handleSend(e);
        }
    }

  return (
    <form
    className='flex items-center gap-2 bg-gray-800 px-4 py-3'
    onSubmit={handleSend}
    >

        <input type="text" 
        value={text}
        className='flex-1 bg-gray-700 text-white rounded-full px-4 py-2 outline-none placeholder-gray-400'
        placeholder='Type a message...'
        onKeyDown={handleKeyDown}
        onChange={(e)=>setText(e.target.value)}
        disabled={loading}
        />
        <button type="submit"
        disabled={loading || !text.trim()}
        className='bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed  px-4 py-2 text-white cursor-pointer rounded-full'
        >Send</button>
    </form>
  )
}

export default MessageInput