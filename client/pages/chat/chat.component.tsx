import React, { useEffect, useRef, useState } from 'react';
import type { ChatType } from './chat.types';
import { Avatar, EmojiPanel, InputField } from './../../Components/index';
import * as Icons from './chat.icons';
import * as Uicons from '@iconscout/react-unicons';
import {
  ButtonContainer,
  ChatArea,
  ChatHeader,
  ChatHeaderIcons,
  ChatHeaderUser,
  ChatSection,
  ChatLeftBubble,
  ChatLeftTexts,
  ChatRight,
  ChatRightBubble,
  ChatRightTexts,
  ChatDetails,
  Container,
  FunctionSection,
  FunctionSectionButton,
  Info,
  MessageBar,
  ProfileContainer,
  ProfileDescription,
  Sidebar,
  ChatSidebar,
  ChatSidebarContent,
  ChatSidebarTitle,
  ChatSidebarContainer,
  SidebarDivider,
  SidebarSearch,
  SidebarTitle,
  SidebarTitleContainer,
  SidebarTopSection,
  SidebarTopIcons,
  Status,
  StatusDescription,
  StatusTitle,
} from './chat.styles';
import { Title } from '../index.styles';
import colors from '../../styles/colors';

const ChatPage: React.FC<ChatType> = (props) => {
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

  const messagesAreaRef: React.RefObject<HTMLDivElement> = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

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

  useEffect(() => {
    messagesAreaRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const recordAudio = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      const audioChunks: string[] = [];
      mediaRecorder.addEventListener('dataavailable', (event: { data: unknown }) => {
        return audioChunks.push(event.data as string);
      });

      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks);
        // console.log('Audio Blob', audioBlob);
        const audioUrl = URL.createObjectURL(audioBlob);
        // console.log('Audio Url', audioUrl);
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
          <SidebarTopIcons>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Uicons.UilCommentDots size={40} color={colors.purple} />
              <Title size='medium' soft>
                ChatMate
              </Title>
            </div>
            <Uicons.UilEllipsisV size={25} color='#cccccc' />
          </SidebarTopIcons>
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
            startIcon={<Uicons.UilSearch color={colors.gray} />}
          />
        </SidebarSearch>
        <SidebarDivider />
        <SidebarTitleContainer>
          <SidebarTitle>Direct Messages</SidebarTitle>
        </SidebarTitleContainer>
        <ChatSidebar>
          {users?.map((user, idx) => {
            if (user.username === username) return null;
            return (
              <ChatSidebarContainer
                key={idx}
                onClick={() => createChatRoom(user.username)}
                isReciever={recieverName === user.username}>
                <Avatar username={user.username} width={40} />
                <ChatSidebarContent>
                  <ChatSidebarTitle>{user.username}</ChatSidebarTitle>
                </ChatSidebarContent>
              </ChatSidebarContainer>
            );
          })}
        </ChatSidebar>
      </Sidebar>
      <ChatArea>
        {isEmojiOpen && <EmojiPanel setValue={setMessageValue} />}
        <ChatHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar username={recieverName} />
            <ChatHeaderUser>{recieverName}</ChatHeaderUser>
          </div>
          <ChatHeaderIcons>
            <Icons.SearchIcon />
            <Icons.Menu />
          </ChatHeaderIcons>
        </ChatHeader>
        {messages?.map((msg: any, index: number) => (
          <ChatSection key={index} ref={messagesAreaRef}>
            <ChatRight>
              {msg.username !== username ? (
                <ChatRightBubble isEmoji={isOnlyEmoji(msg.text)}>
                  <ChatRightTexts isEmoji={isOnlyEmoji(msg.text)}>{msg?.text}</ChatRightTexts>
                </ChatRightBubble>
              ) : (
                <ChatLeftBubble isEmoji={isOnlyEmoji(msg.text)}>
                  <ChatLeftTexts isEmoji={isOnlyEmoji(msg.text)}>{msg?.text}</ChatLeftTexts>
                </ChatLeftBubble>
              )}
            </ChatRight>
          </ChatSection>
        ))}
        <MessageBar>
          <ButtonContainer onClick={(event) => setIsEmojiOpen(!isEmojiOpen)}>
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
            event={sendMessageAction}
            startIcon={<Uicons.UilKeyboard color={colors.gray} size='20' />}
          />
          <ButtonContainer onClick={sendMessageAction}>
            <Uicons.UilMessage size='24' />
          </ButtonContainer>
        </MessageBar>
      </ChatArea>
      <ChatDetails>
        <ProfileContainer>
          <Avatar username={recieverName} width={120} fontSize={30} />
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
