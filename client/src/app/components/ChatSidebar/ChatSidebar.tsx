"use client";

import { Avatar, Button, Card, CardBody, Divider } from '@lib'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRightArrowLeft } from '@icons';
import type { SidebarProps } from './ChatSidebar.types';

const ChatSidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  sideBarDragEnd,
  toggleSidebar,
  handleSendMessage,
  users,
  isLeftSidebar }) => {
  return (
    <Card
      className={`bg-white ${isSidebarOpen ? 'dark:bg-slate-700' : 'dark:bg-slate-700/50'} 
        border-1 border-slate-800 h-full w-full md:w-80 absolute rounded-none shadow-lg 
      ${isSidebarOpen ? 'block' : 'hidden'} md:block md:relative z-10`}
      draggable
      onDragEnd={sideBarDragEnd}
    >
      <CardBody className="p-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Button
              isIconOnly
              size="md"
              color="secondary"
              variant="faded"
              onClick={handleSendMessage}>
              <Avatar
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                color="primary" />
              isBordered
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              className="md:hidden mr-2"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
            <h2 className="text-xl font-thin">Aseer</h2>
          </div>
        </div>
        <div className="space-y-4">
          <Divider />
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center space-x-3 cursor-pointer hover:bg-slate-800 dark:hover:bg-slate-700 border-slate-800 p-3 rounded-lg">
              <Avatar name={user.name} color='secondary' className="w-10 h-10" />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user.status === 'online' ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
      <Button
        isIconOnly
        onClick={sideBarDragEnd}
        color='secondary'
        variant='flat'
        size='lg'
        className={`absolute h-12 ${isLeftSidebar ? 'left-2' : 'right-2'} bottom-4`}>
        <FontAwesomeIcon icon={faArrowRightArrowLeft} />
      </Button>
    </Card>
  )
}

export default ChatSidebar;
