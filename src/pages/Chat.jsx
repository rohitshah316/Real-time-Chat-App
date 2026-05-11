import React from 'react'
import Navbar from '../components/Navbar';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput'

const Chat = () => {
  return (
    <div className='h-screen flex flex-col bg-gray-900'>
        <Navbar/>
        <MessageList/>
        <MessageInput/>
    </div>
  )
}

export default Chat