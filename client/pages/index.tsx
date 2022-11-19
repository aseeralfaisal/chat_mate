import React, { useState } from 'react';
import Button1 from '../Components/Button1';
import InputField from '../Components/InputField';
import styles from '../styles/Home.module.scss';

export default function Home() {
  const [registerMode, setRegisterMode] = useState(false);
  const changeMode = () => setRegisterMode(!registerMode);

  const SignUpDesc = ({ desc, action }) => {
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
          <InputField placeholder='Username' />
          <InputField placeholder='Password' />
          {registerMode ? <Button1 title='Register' /> : <Button1 title='Log in' />}
          {registerMode ? (
            <SignUpDesc desc='Not Registered?' action='Register' />
          ) : (
            <SignUpDesc desc='Already have an account?' action='Sign in' />
          )}
        </div>
      </div>
    </>
  );
}
