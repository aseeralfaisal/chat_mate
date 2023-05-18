import React from 'react';
import { AlertMessageProps } from './alert.types';
import { Alert } from './alert.styles';
import colors from '../../styles/colors';
import * as Uicons from '@iconscout/react-unicons';

const AlertMessage: React.FC<AlertMessageProps> = ({ message }) => {
  return (
    <Alert>
      <Uicons.UilInfoCircle size={20} color={colors.red} />
      <span style={{ color: colors.red }}>{message}</span>
    </Alert>
  );
};

export default AlertMessage;
