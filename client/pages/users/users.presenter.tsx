import React from 'react';
import InputField from '../../Components/InputField';
import styles from '../../styles/UserList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import MainButton from '../../Components/MainButton';
import type { usersType } from './users.types';

const Chats = ({ messages, username }: { messages: any[]; username: string }) => (
  <>
    {messages &&
      messages.map((msg: { username: string; text: string }, idx: number) => (
        <div
          key={idx}
          style={{ display: 'flex', justifyContent: msg.username === username ? 'flex-end' : 'flex-start', width: 940 }}>
          <div className={msg.username !== username ? styles.msg : styles.msg_right}>
            {msg.username !== username && <label className={styles.label}>{msg.username}: </label>}
            <label className={styles.label}>{msg.text}</label>
          </div>
        </div>
      ))}
  </>
);

const Users: React.FC<usersType> = (props) => {
  const {
    users,
    username,
    recieverName,
    messages,
    createChatRoom,
    textInputVal,
    setTextInputVal,
    sendMessageAction,
  } = props;
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginRight: 60,
      }}>
      <div className={styles.container}>
        <InputField type='text' placeholder='Search Users...' width={280} value={''} setValue={undefined} />
        {users
          ?.filter((user: { username: string }) => user.username !== username)
          .map((user: { username: string; id: number }, idx: number) => (
            <div
              key={idx}
              className={styles.userlist}
              style={{
                backgroundColor: recieverName === user.username ? '#664ccf33' : '#00000000',
                borderRadius: 12,
                padding: 10,
              }}>
              <FontAwesomeIcon icon={icons.faUserCircle} color='#eee' fontSize={32} />
              <label className={styles.username} key={user.id} onClick={() => createChatRoom(user.username)}>
                {user.username}
              </label>
            </div>
          ))}
      </div>
      <div style={{ marginLeft: 330 }}>
        <Chats messages={messages} username={username} />
        <div style={{ display: 'flex', alignItems: 'center', position: 'fixed', bottom: 0 }}>
          <InputField
            type='text'
            placeholder='Type a message'
            width={800}
            value={textInputVal}
            setValue={setTextInputVal}
            reduxValue={false}
          />
          <MainButton title='Send' action={sendMessageAction} width={150} marginTop={0} margin={14} />
        </div>
      </div>
    </div>
  );
};

export default Users;
