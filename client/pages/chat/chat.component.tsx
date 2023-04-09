import React, { useEffect, useRef, useState } from 'react';
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
  SidebarChatContentText,
  SidebarChatContentTitle,
  SidebarChatContainer,
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
  const emojiRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])/g;
  const fun = (str: string) => {
    const emojiText = str.split(emojiRegex);
    emojiText.map((t: string) => {
      console.log(t.match(emojiRegex));
    });
  };
  const messagesAreaRef = useRef();
  useEffect(() => {
    messagesAreaRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const recordAudio = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      const audioChunks = [];
      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks);
        console.log('Audio Blob', audioBlob);
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log('Audio Url', audioUrl);
        const audio = new Audio(audioUrl);
        audio.play();
      });

      setTimeout(() => {
        mediaRecorder.stop();
      }, 4000);
    });
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
                <SidebarChatContainer
                  key={idx}
                  onClick={() => createChatRoom(user.username)}
                  isReciever={recieverName === user.username}>
                  {generatedUserProfile(user.username.slice(0, 1), 40, 40)}
                  <SidebarChatContent>
                    <SidebarChatContentTitle>{user.username}</SidebarChatContentTitle>
                    {/* <SidebarChatContentTitle soft>{messages[messages.length - 1]?.text.slice(0,1)}</SidebarChatContentTitle> */}
                  </SidebarChatContent>
                </SidebarChatContainer>
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
          <ChatAreaSection key={index} ref={messagesAreaRef}>
            <ChatAreaSectionRightchat>
              {msg.username !== username ? (
                <ChatAreaSectionRightchatChatbubble isEmoji={isOnlyEmoji(msg.text)}>
                  <ChatAreaSectionRightchatTexts isEmoji={isOnlyEmoji(msg.text)}>
                    {console.log(fun(msg.text))}
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
          <ButtonContainer onClick={recordAudio}>
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
