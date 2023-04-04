import React, { useState } from 'react';
import type { chatType } from './chat.types';
import { InputField } from './../../Components/index';
import * as Icons from './chat.icons';
import * as Uicons from '@iconscout/react-unicons';
import {
  ButtonContainer,
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
    messageValue,
    setMessageValue,
    recieverName,
  } = props;

  const [searchValue, setSearchValue] = useState('');
  const isOnlyEmoji = (character: string) => {
    const regex = /^[\p{Emoji}\u200D\uFE0F]+$/u;
    return regex.test(character);
  };
  return (
    <Container>
      <Sidebar>
        <SidebarTopSection>
          <SidebarTopSectionIcons>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Uicons.UilCommentDots size={40} color='#7c5cfc' />
              <Title size='medium' soft>
                ChatMate
              </Title>
            </div>
            <Uicons.UilEllipsisV size={25} color='#cccccc' />
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
            startIcon={<Uicons.UilSearch />}
          />
        </SidebarSearch>
        <SidebarDevider />
        <SidebarTitleContainer>
          <SidebarTitle>Direct Messages</SidebarTitle>
        </SidebarTitleContainer>
        <SidebarChat>
          {users?.map((user, idx) => {
            if (user.username !== username) {
              return (
                <SidebarChatUser
                  key={idx}
                  onClick={() => createChatRoom(user.username)}
                  isReciever={recieverName === user.username}>
                  {generatedUserProfile(user.username.slice(0, 1), 40, 40)}
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
                <ChatAreaSectionRightchatChatbubble isEmoji={isOnlyEmoji(msg.text)}>
                  <ChatAreaSectionRightchatTexts isEmoji={isOnlyEmoji(msg.text)}>
                    {msg?.text}
                  </ChatAreaSectionRightchatTexts>
                </ChatAreaSectionRightchatChatbubble>
              ) : (
                <ChatAreaSectionLeftchatChatbubble isEmoji={isOnlyEmoji(msg.text)}>
                  <ChatAreaSectionLeftchatTexts isEmoji={isOnlyEmoji(msg.text)}>
                    {msg?.text}
                  </ChatAreaSectionLeftchatTexts>
                </ChatAreaSectionLeftchatChatbubble>
              )}
            </ChatAreaSectionRightchat>
          </ChatAreaSection>
        ))}
        <MessageBar>
          <ButtonContainer>
            <Uicons.UilGrin size='24' />
          </ButtonContainer>
          <ButtonContainer>
            <Uicons.UilMicrophone size='24' />
          </ButtonContainer>
          <InputField
            type='text'
            placeholder='Type a message'
            width={750}
            height={36}
            fontSize={15}
            value={messageValue}
            setValue={setMessageValue}
            reduxValue={false}
            event={sendMessageAction}
            startIcon={<Uicons.UilKeyboard color='#999999' size='30' />}
          />
          <ButtonContainer onClick={sendMessageAction}>
            <Uicons.UilMessage size='24' />
          </ButtonContainer>
        </MessageBar>
      </ChatArea>
      <ChatDetails>
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
          </FunctionSectionButton>
        </FunctionSection>
      </ChatDetails>
    </Container>
  );
};

export default ChatPage;
