'use client'

import React, { useState } from 'react'
import { ChatSidebar, ChatArea, MobileHeader, RealTimeModal } from '@components'
import { useDisclosure } from '@lib'
import type { Message, User } from './page.types'

const ChatPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isLeftSidebar, setIsLeftSidebar] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const realTimeModal = useDisclosure();

  const users: User[] = [
    { id: 1, name: 'Alien-A578', avatar: '/placeholder.svg?height=40&width=40', status: 'online' },
    { id: 3, name: 'Alien-B24f', avatar: '/placeholder.svg?height=40&width=40', status: 'online' },
  ]
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'Alien', content: 'Hey, how are you?', timestamp: '10:30 AM' },
    { id: 2, sender: 'You', content: 'Im doing great, thanks! How about you?', timestamp: '10: 32 AM' },
    { id: 3, sender: 'Alien', content: 'Im good too.Did you finish the project?', timestamp: '10: 33 AM' }
  ])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages([...messages, newMessage])
      setInputMessage('')
    }
  }

  const toggleSidebar = () => void setIsSidebarOpen(!isSidebarOpen);
  const sideBarDragEnd = () => void setIsLeftSidebar(!isLeftSidebar);

  const sidebarProps = { isSidebarOpen, isLeftSidebar, toggleSidebar, sideBarDragEnd, handleSendMessage };
  const chatAreaProps = { inputMessage, setInputMessage, handleSendMessage, onOpen: realTimeModal.onOpen };

  return (
    <div className={`h-screen w-full relative flex flex-col 
      ${!isLeftSidebar ? "md:flex-row" : "md:flex-row-reverse"} 
      bg-gray-100 dark:bg-slate-800`
    }>
      <RealTimeModal isOpen={realTimeModal.isOpen} onOpenChange={realTimeModal.onOpenChange} />
      <MobileHeader toggleSidebar={toggleSidebar} />
      <ChatSidebar users={users} {...sidebarProps} />
      <ChatArea messages={messages} {...chatAreaProps} />
    </div >
  )
}

export default ChatPage;

