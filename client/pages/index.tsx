import React, { useState } from 'react';
import MainButton from '../Components/MainButton';
import InputField from '../Components/InputField';
import styles from '../styles/Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import Router from 'next/router';
import { useAppSelector } from '../redux/hooks';
import { setUserName } from '../redux/features/userSlice';
import { fetchApi } from '../fetch.api';

export default function Home() {
  const [registerMode, setRegisterMode] = useState(false);
  const changeMode = () => setRegisterMode(!registerMode);
  const [password, setPassword] = useState('');
  const username = useAppSelector((state) => state.user.username);

  const DescriptionTitle = ({ desc, action }: { desc: string; action: string }) => (
    <div className={styles.register}>
      <label className={styles.desc}>{desc}</label>
      <label className={styles.action} onClick={changeMode}>
        {action}
      </label>
    </div>
  );

  const registerAction = async () => {
    try {
      const registerData = await fetchApi('register', 'POST', { username, password });
      registerData && alert(registerData.value);
    } catch (error) {
      console.error(error);
    }
  };
  const loginAction = async () => {
    try {
      const loginData = await fetchApi('login', 'POST', { username, password });
      if (loginData?.code === 201) {
        Router.push({ pathname: '/users' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.form}>
        <div className={styles.form__child}>
          <div style={{ margin: 60 }}>
            <FontAwesomeIcon icon={faCommentDots} color='#7c5cfc' fontSize={100} />
            <h2 className={styles.textus}>Textus</h2>
          </div>
          <div>
            <InputField
              type='text'
              reduxValue
              placeholder='Username'
              value={username}
              setValue={setUserName}
            />
            <InputField type='password' placeholder='Password' value={password} setValue={setPassword} />
            {registerMode ? (
              <MainButton title='Register' action={registerAction} />
            ) : (
              <MainButton title='Log in' action={loginAction} />
            )}
            {!registerMode ? (
              <DescriptionTitle desc='Not Registered?' action='Register' />
            ) : (
              <DescriptionTitle desc='Already have an account?' action='Sign in' />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
