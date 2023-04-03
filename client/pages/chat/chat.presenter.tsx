import React, { useState } from 'react';
import styles from './chat-page.styles.module.scss';
import type { chatType } from './chat.types';
import InputField from '../../Components/InputField';
import * as Icons from './icons.chat';

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
    <div className={styles.parent}>
      <div className={styles.sidebar}>
        <div className={styles.sidebar__top__section}>
          {/* <Image src={<Icons.UserIcon />} alt={'UserIcon'} /> */}
          <div className={styles.sidebar__top__section__icons}>
            <Icons.AddMessage />
            <Icons.Menu />
          </div>
        </div>
        <div className={styles.sidebar__search}>
          <InputField
            placeholder='Search'
            type='text'
            height={40}
            width={280}
            value={searchValue}
            setValue={setSearchValue}
            fontSize={15}
            endIcon={<Icons.SearchIcon />}
          />
        </div>
        <div className={styles.sidebar__devider} />
        <div className={styles.sidebar__title__container}>
          <h5 className={styles.sidebar__title}>Messages</h5>
        </div>
        <div className={styles.sidebar__chat}>
          {users?.map((user, idx) => {
            if (user.username !== username) {
              return (
                <div
                  key={idx}
                  className={styles.sidebar__chat__user}
                  onClick={() => createChatRoom(user.username)}
                  style={{ background: recieverName === user.username ? '#141416' : 'none' }}>
                  {generatedUserProfile(user.username.slice(0, 1))}
                  <div className={styles.sidebar__chat__content}>
                    <h3 className={styles.sidebar__chat__content__title}>{user.username}</h3>
                    {/* {messages && (
                      <p className={styles.sidebar__chat__content__text}>{messages[messages.length - 1]?.text}</p>
                    )} */}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className={styles.chat__area}>
        <div className={styles.chat__area__header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {generatedUserProfile(recieverName.slice(0, 1))}
            <h3 className={styles.chat__area__header__user}>{recieverName}</h3>
          </div>
          <div className={styles.chat__area__header__icons}>
            <Icons.SearchIcon />
            <Icons.Menu />
          </div>
        </div>
        {messages?.map((msg, index) => (
          <div key={index} className={styles.chat__area__section}>
            <div className={styles.chat__area__section__rightchat}>
              {msg.username !== username ? (
                <div className={styles.chat__area__section__rightchat__chatbubble}>
                  <p className={styles.chat__area__section__rightchat__texts}>{msg?.text}</p>
                </div>
              ) : (
                <div className={styles.chat__area__section__leftchat__chatbubble}>
                  <p className={styles.chat__area__section__leftchat__texts}>{msg?.text}</p>
                </div>
              )}
            </div>
          </div>
        ))}
        <div className={styles.message__bar}>
          <Icons.FaceIcon />
          <InputField
            type='text'
            placeholder='Type a message'
            width={700}
            height={40}
            fontSize={15}
            value={textInputVal}
            setValue={setTextInputVal}
            reduxValue={false}
            event={sendMessageAction}
          />
          <div
            style={{ color: sendButtonColor, marginTop: 5 }}
            onMouseEnter={() => setSendButtonColor('#bbb')}
            onMouseLeave={() => setSendButtonColor('#664ccf')}
            onClick={sendMessageAction}>
            <Icons.SendIcon />
          </div>
          <Icons.MicIcon />
        </div>
      </div>
      <div className={styles.chat__details}>
        <div className={styles.chat__details__header}>
          <Icons.CloseIcon />
          <span className={styles.chat__details__header__title}>Contact info</span>
        </div>
        <div className={styles.profile__container}>
          {generatedUserProfile(recieverName, 180, 180, 24)}
          <div className={styles.profile__description}>
            <span className={styles.status__title}>{recieverName}</span>
            <span className={styles.status__description}>....</span>
          </div>
        </div>
        <div className={styles.status}>
          <span className={styles.status__title}>Status</span>
          <span className={styles.status__description}>Chilling</span>
        </div>
        <div className={styles.function__section}>
          <div className={styles.function__section__button}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Icons.StarIcon />
              <span className={styles.info}>Marked messages</span>
            </div>
            <Icons.RightIcon />
          </div>
          <div className={styles.function__section__button}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Icons.SettingsIcon />
              <span className={styles.info}>Settings</span>
            </div>
            <Icons.RightIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
