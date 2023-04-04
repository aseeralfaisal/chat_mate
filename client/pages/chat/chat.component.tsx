import React, { useState } from 'react';
import type { chatType } from './chat.types';
import { InputField } from './../../Components/index';
import * as Icons from './chat.icons';
import {
  ChatArea,
  ChatAreaHeader,
  ChatAreaHeaderIcons,
  ChatAreaHeaderUser,
  ChatAreaSection,
  ChatAreaSectionLeftchatChatbubble,
  ChatAreaSectionLeftchatTexts,
  ChatAreaSectionRightchat,
  ChatAreaSectionRightchatChatbubble,
  ChatAreaSectionRightchatTexts,
  ChatDetails,
  Container,
  FunctionSection,
  FunctionSectionButton,
  Info,
  MessageBar,
  ProfileContainer,
  ProfileDescription,
  SendButtonContainer,
  Sidebar,
  SidebarChat,
  SidebarChatContent,
  SidebarChatContentTitle,
  SidebarChatUser,
  SidebarDevider,
  SidebarSearch,
  SidebarTitle,
  SidebarTitleContainer,
  SidebarTopSection,
  SidebarTopSectionIcons,
  Status,
  StatusDescription,
  StatusTitle,
} from './chat.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Title } from '../index.styles';

const generatedUserProfile = (
  username: string,
  width: number = 50,
  height: number = 50,
  fontSize: number = 14
) => {
  const colors = ['#7c5cfc', '#664ccf', '#513aad', '#664ccf66', '#664ccf33'];
  return (
    <div
      style={{
        width,
        height,
        objectFit: 'cover',
        background: colors[2],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '100%',
        textTransform: 'capitalize',
        color: '#ffffff',
        fontSize,
      }}>
      {username}
    </div>
  );
};

const ChatPage: React.FC<chatType> = (props) => {
  const {
    users,
    username,
    createChatRoom,
    messages,
    sendMessageAction,
    textInputVal,
    setTextInputVal,
    recieverName,
  } = props;

  const [searchValue, setSearchValue] = useState('');
  const [sendButtonColor, setSendButtonColor] = useState('#664ccf');

  return (
    <Container>
      <Sidebar>
        <SidebarTopSection>
          {/* <Icons.UserIcon /> */}
          <SidebarTopSectionIcons>
            {/* <Icons.AddMessage /> */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <FontAwesomeIcon icon={faCommentDots} color='#7c5cfc' fontSize={32} />
              <Title size='medium'>ChatMate</Title>
            </div>
            <Icons.Menu />
          </SidebarTopSectionIcons>
        </SidebarTopSection>
        <SidebarSearch>
          <InputField
            placeholder='Search'
            type='text'
            height={36}
            width={260}
            value={searchValue}
            setValue={setSearchValue}
            fontSize={15}
            startIcon={
              <div style={{ color: '#ffffff88', marginTop: 3 }}>
                <FontAwesomeIcon icon={faSearch} fontSize={20} />
              </div>
            }
          />
        </SidebarSearch>
        <SidebarDevider />
        <SidebarTitleContainer>
          <SidebarTitle>Messages</SidebarTitle>
        </SidebarTitleContainer>
        <SidebarChat>
          {users?.map((user, idx) => {
            if (user.username !== username) {
              return (
                <SidebarChatUser
                  key={idx}
                  onClick={() => createChatRoom(user.username)}
                  css={{ background: recieverName === user.username ? '#141416' : 'none' }}>
                  {generatedUserProfile(user.username.slice(0, 1))}
                  <SidebarChatContent>
                    <SidebarChatContentTitle>{user.username}</SidebarChatContentTitle>
                    {/* {messages && (
                      <SidebarChatContentText>{messages[messages.length - 1]?.text}</SidebarChatContentText>
                    )} */}
                  </SidebarChatContent>
                </SidebarChatUser>
              );
            }
          })}
        </SidebarChat>
      </Sidebar>
      <ChatArea>
        <ChatAreaHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {generatedUserProfile(recieverName.slice(0, 1))}
            <ChatAreaHeaderUser>{recieverName}</ChatAreaHeaderUser>
          </div>
          <ChatAreaHeaderIcons>
            <Icons.SearchIcon />
            <Icons.Menu />
          </ChatAreaHeaderIcons>
        </ChatAreaHeader>
        {messages?.map((msg: any, index: number) => (
          <ChatAreaSection key={index}>
            <ChatAreaSectionRightchat>
              {msg.username !== username ? (
                <ChatAreaSectionRightchatChatbubble>
                  <ChatAreaSectionRightchatTexts>{msg?.text}</ChatAreaSectionRightchatTexts>
                </ChatAreaSectionRightchatChatbubble>
              ) : (
                <ChatAreaSectionLeftchatChatbubble>
                  <ChatAreaSectionLeftchatTexts>{msg?.text}</ChatAreaSectionLeftchatTexts>
                </ChatAreaSectionLeftchatChatbubble>
              )}
            </ChatAreaSectionRightchat>
          </ChatAreaSection>
        ))}
        <MessageBar>
          <Icons.FaceIcon />
          <InputField
            type='text'
            placeholder='Type a message'
            width={750}
            height={36}
            fontSize={15}
            value={textInputVal}
            setValue={setTextInputVal}
            reduxValue={false}
            event={sendMessageAction}
            startIcon={
              <div style={{ color: '#ffffff66', marginTop: 3 }}>
                <FontAwesomeIcon icon={faCommentDots} fontSize={22} />
              </div>
            }
          />
          <SendButtonContainer
            css={{ color: sendButtonColor, marginTop: 5 }}
            onMouseEnter={() => setSendButtonColor('#bbb')}
            onMouseLeave={() => setSendButtonColor('#664ccf')}
            onClick={sendMessageAction}>
            <Icons.SendIcon />
          </SendButtonContainer>
          <Icons.MicIcon />
        </MessageBar>
      </ChatArea>
      <ChatDetails>
        {/* <ChatAreaHeader>
          <Icons.CloseIcon />
          <ChatDetailsHeaderTitle>Contact info</ChatDetailsHeaderTitle>
        </ChatAreaHeader> */}
        <ProfileContainer>
          {generatedUserProfile(recieverName, 180, 180, 24)}
          <ProfileDescription>
            <StatusTitle>{recieverName}</StatusTitle>
            <StatusTitle>....</StatusTitle>
          </ProfileDescription>
        </ProfileContainer>
        <Status>
          <StatusTitle>Status</StatusTitle>
          <StatusDescription>Chilling</StatusDescription>
        </Status>
        <FunctionSection>
          <FunctionSectionButton>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Icons.StarIcon />
              <Info>Marked messages</Info>
            </div>
            <Icons.RightIcon />
          </FunctionSectionButton>
          <FunctionSectionButton>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Icons.SettingsIcon />
              <Info>Settings</Info>
            </div>
            <Icons.RightIcon />
          </FunctionSectionButton>
        </FunctionSection>
      </ChatDetails>
    </Container>
  );
};

export default ChatPage;
