"use client";

import { InputField } from "@components";
import { Card, CardHeader, CardBody, Button, Divider } from "@lib";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightToBracket,
  faCommentDots,
  faEnvelopeOpenText,
  faIdCard,
  faLock
} from '@icons';

const LoginCard: React.FC = () => {
  return (
    <div className='grid gap-8'>
      <Card className="w-[450px] h-[400px] bg-slate-900/20 px-8 border-1 border-gray-700">
        <CardHeader className='text-2xl pt-8 font-semibold text-violet-300 gap-5'>
          <FontAwesomeIcon icon={faCommentDots} size='xl' color='#8b5cf6' />
          Chatmate
        </CardHeader>
        <Divider />
        <CardBody className="gap-5 pt-8">
          <div className="flex gap-3">
            <InputField placeholder='First Name' startContent={
              <div className='mr-2'>
                <FontAwesomeIcon icon={faIdCard} />
              </div>
            } />
            <InputField placeholder='Last Name' startContent={
              <div className='mr-2'>
                <FontAwesomeIcon icon={faIdCard} />
              </div>
            } />
          </div>
          <InputField placeholder='Email' startContent={
            <div className='mr-2'>
              <FontAwesomeIcon icon={faEnvelopeOpenText} />
            </div>
          } />
          <InputField placeholder='Password' type="password" startContent={
            <div className='mr-2'>
              <FontAwesomeIcon icon={faLock} />
            </div>
          } />
          <Divider />
          <Button size='md' color='primary' className="bg-violet-500 font-medium mt-3" startContent={
            <div className='mr-2'>
              <FontAwesomeIcon icon={faArrowRightToBracket} />
            </div>
          }>
            Login
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}

export default LoginCard
