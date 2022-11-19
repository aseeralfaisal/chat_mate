import React, { useState } from 'react';
import Button1 from '../Components/Button1';
import InputField from '../Components/InputField';
import styles from '../styles/Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

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

  return (
    <>
      <div className={styles.form}>
        <div className={styles.form__child}>
          <div style={{ margin: 60 }}>
            <FontAwesomeIcon icon={faCommentDots} color='#7c5cfc' fontSize={100} />
            <h2 className={styles.textus}>Textus</h2>
          </div>
          <div>
            <InputField placeholder='Username' setValue={setUserValue} />
            <InputField placeholder='Password' setValue={setPassValue} />
            {registerMode ? <Button1 title='Register' /> : <Button1 title='Log in' />}
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
