import React, { useState } from 'react';
import { AlertMessage, InputField, MainButton } from '../Components/index';
import { Action, Description, Form, FormChild, Register, Title } from './index.styles';
import Router from 'next/router';
import { useAppSelector } from '../redux/hooks';
import { setUserName } from '../redux/slices/userSlice';
import * as Uicons from '@iconscout/react-unicons';
import colors from '../styles/colors';
import Api from './api/api.interceptors';
import { useDispatch } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();
  const [registerMode, setRegisterMode] = useState(false);
  const changeMode = () => setRegisterMode(!registerMode);
  const [password, setPassword] = useState('');
  const username = useAppSelector((state) => state.user.username);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSetUserName = (username: string) => dispatch(setUserName(username));

  const DescriptionTitle = ({ text, action }: { text: string; action: string }) => (
    <Register>
      <Description>{text}</Description>
      <Action onClick={changeMode}>{action}</Action>
    </Register>
  );

  const registerAction = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    try {
      event.preventDefault();
      const registerData = await Api.post('/register', { username, password });
      registerData && alert(registerData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loginAction = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    try {
      event.preventDefault();
      setErrorMessage('');
      const loginData = await Api.post('/login', { username, password });
      console.log(loginData.data);
      if (loginData.status === 201) {
        handleSetUserName(loginData.data.username);
        Router.push({ pathname: '/chat' });
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Form>
        <FormChild>
          {errorMessage && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 500, marginTop: 10 }}>
                <AlertMessage message={errorMessage} />
              </div>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
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
                // event={registerMode ? registerAction : loginAction}
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
          </div>
        </FormChild>
      </Form>
    </>
  );
}
