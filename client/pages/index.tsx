import React, { useState } from 'react';
import Button1 from '../Components/Button1';
import InputField from '../Components/InputField';
import styles from '../styles/Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Home() {
  const [registerMode, setRegisterMode] = useState(false);
  const changeMode = () => setRegisterMode(!registerMode);
  const [userValue, setUserValue] = useState('');
  const [passValue, setPassValue] = useState('');

  const LogDescription = ({ desc, action }) => {
    return (
      <div className={styles.register}>
        <label className={styles.desc}>{desc}</label>
        <label className={styles.action} onClick={changeMode}>
          {action}
        </label>
      </div>
    );
  };

  const BASE_URL = 'http://localhost:3001';

  const authBtnAction = async () => {
    try {
      const register = await axios.post(`${BASE_URL}/register`, {
        username: userValue,
        password: passValue,
      });
      if (register) {
        alert(register.data);
      }
    } catch ({ response }) {
      const { status, data }: any = response;
      if (status == 409) {
        window.alert(data);
      }
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
            <InputField type='text' placeholder='Username' setValue={setUserValue} />
            <InputField type='password' placeholder='Password' setValue={setPassValue} />
            {registerMode ? (
              <Button1 title='Register' action={authBtnAction} />
            ) : (
              <Button1 title='Log in' action={null} />
            )}
            {!registerMode ? (
              <LogDescription desc='Not Registered?' action='Register' />
            ) : (
              <LogDescription desc='Already have an account?' action='Sign in' />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
