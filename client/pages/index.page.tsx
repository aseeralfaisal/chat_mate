import React, { useState } from 'react';
import { AlertMessage, InputField, MainButton } from '../Components/index';
import { Action, Description, Form, FormChild, Register, Title } from '../styles/index.styles';
import Router from 'next/router';
import { setUserName } from '../redux/slices/userSlice';
import * as Uicons from '@iconscout/react-unicons';
import colors from '../styles/colors';
import Api from './api/api.interceptors';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export default function Home() {
  const dispatch = useAppDispatch();
  const [registerMode, setRegisterMode] = useState(false);
  const changeMode = () => setRegisterMode(!registerMode);
  const [password, setPassword] = useState('');
  const username = useAppSelector((state) => state.user.userName);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSetUserName = (value: string) => dispatch(setUserName(value));

  const DescriptionTitle = ({ text, action }: { text: string; action: string }) => (
    <Register>
      <Description>{text}</Description>
      <Action onClick={changeMode}>{action}</Action>
    </Register>
  );

  const registerAction = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.FormEvent<HTMLFormElement>
  ) => {
    try {
      event.preventDefault();
      const registerData = await Api.post('/register', { username, password });
      registerData && alert(registerData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loginAction = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.FormEvent<HTMLFormElement>
  ) => {
    try {
      event.preventDefault();
      setErrorMessage('');
      const loginData = await Api.post('/login', { username, password });
      if (loginData.status === 201) {
        dispatch(setUserName(loginData.data.user));
        Router.push({ pathname: '/chat' });
      }
    } catch (error) {
      if (error instanceof Error && error.message) {
        setErrorMessage(error.message);
      }
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
            <form
              style={{ display: 'grid', gap: 20 }}
              onSubmit={(event) => (registerMode ? registerAction(event) : loginAction(event))}>
              <InputField
                type='text'
                placeholder='Username'
                value={username}
                setValue={handleSetUserName}
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
