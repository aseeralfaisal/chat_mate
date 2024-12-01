"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPhone, faVideo } from '@icons'
import { Button } from "@lib"
import { InputField } from '@components'
import type { ChatAreaProps } from './ChatArea.types';

const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  onOpen
}) => {
  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] md:h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`min-w-[10%] max-w-[75%] p-3 rounded-lg ${message.sender === 'You'
                ? 'bg-violet-700/50 text-white'
                : 'bg-slate-700 dark:bg-slate-700 text-gray-900 dark:text-white'
                }`}
            >
              <p className="font-semibold">{message.sender}</p>
              <p className="break-words">{message.content}</p>
              <p className="text-xs text-right mt-1 opacity-70">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='flex items-center'>
        <div className="p-4 w-full">
          <InputField
            className='border-1 border-violet-800 rounded-xl'
            height="h-12"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
            onKeyPress={(e: React.KeyboardEvent<HTMLElement>) => e.key === 'Enter' && handleSendMessage()}
            endContent={
              <>
                <Button isIconOnly size="sm" color="secondary" variant="solid" onClick={handleSendMessage}>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </Button>
              </>
            }
          />
        </div>
        <div className='flex space-x-3 mr-3'>
          <Button isIconOnly size="lg" color="secondary" variant="faded" onClick={onOpen}>
            <FontAwesomeIcon icon={faPhone} />
          </Button>
          <Button isIconOnly size="lg" color="secondary" variant="faded" onClick={onOpen}>
            <FontAwesomeIcon icon={faVideo} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatArea
