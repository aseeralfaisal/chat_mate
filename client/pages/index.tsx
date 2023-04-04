import React, { useState } from 'react';
import { InputField, MainButton } from '../Components/index';
import { Action, Description, Form, FormChild, Register, Textus } from './index.styles';
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

  const DescriptionTitle = ({ text, action }: { text: string; action: string }) => (
    <Register>
      <Description>{text}</Description>
      <Action onClick={changeMode}>{action}</Action>
    </Register>
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
        Router.push({ pathname: '/chat' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Form>
        <FormChild>
          <div style={{ margin: 60 }}>
            <FontAwesomeIcon icon={faCommentDots} color='#7c5cfc' fontSize={100} />
            <Textus>Textus</Textus>
          </div>
          <div>
            <InputField
              type='text'
              reduxValue
              placeholder='Username'
              value={username}
              setValue={setUserName}
              width={300}
              height={40}
            />
            <InputField
              type='password'
              placeholder='Password'
              value={password}
              setValue={setPassword}
              width={300}
              height={40}
              event={registerMode ? registerAction : loginAction}
            />
            {registerMode ? (
              <MainButton title='Register' height={40} action={registerAction} />
            ) : (
              <MainButton title='Log in' height={40} action={loginAction} />
            )}
            {!registerMode ? (
              <DescriptionTitle text='Not Registered?' action='Register' />
            ) : (
              <DescriptionTitle text='Already have an account?' action='Sign in' />
            )}
          </div>
        </FormChild>
      </Form>
    </>
  );
}
