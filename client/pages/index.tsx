import React, { useState } from 'react';
import { InputField, MainButton } from '../Components/index';
import { Action, Description, Form, FormChild, Register, Title } from './index.styles';
import Router from 'next/router';
import { useAppSelector } from '../redux/hooks';
import { setUserName } from '../redux/features/userSlice';
import { fetchApi } from '../fetch.api';
import * as Uicons from '@iconscout/react-unicons';
import colors from '../styles/colors';

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

  const registerAction = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    try {
      event.preventDefault();
      const registerData = await fetchApi('register', 'POST', { username, password });
      registerData && alert(registerData.value);
    } catch (error) {
      console.error(error);
    }
  };
  const loginAction = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    try {
      event.preventDefault();
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
            <Uicons.UilCommentDots size={90} color='#7c5cfc' />
            <Title>ChatMate</Title>
          </div>
          <form style={{ display: 'grid', gap: 20 }}>
            <InputField
              type='text'
              reduxValue
              placeholder='Username'
              value={username}
              setValue={setUserName}
              width={280}
              height={36}
              startIcon={<Uicons.UilUser color={colors.gray} size='20' />}
            />
            <InputField
              type='password'
              placeholder='Password'
              value={password}
              setValue={setPassword}
              width={280}
              height={36}
              event={registerMode ? registerAction : loginAction}
              startIcon={<Uicons.UilKeyboard color={colors.gray} size='20' />}
            />
            {registerMode ? (
              <MainButton
                type='submit'
                title='Register'
                height={36}
                width={280}
                action={(event) => registerAction(event)}
              />
            ) : (
              <MainButton
                type='submit'
                title='Log in'
                height={36}
                width={280}
                action={(event) => loginAction(event)}
              />
            )}
            {!registerMode ? (
              <DescriptionTitle text='Not Registered?' action='Register' />
            ) : (
              <DescriptionTitle text='Already have an account?' action='Sign in' />
            )}
          </form>
        </FormChild>
      </Form>
    </>
  );
}
