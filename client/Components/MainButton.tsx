import React from 'react';
import { Button } from './styles/MainButton.styles';
import { MainButtonProps } from './types/MainButton.types';

const MainButton: React.FC<MainButtonProps> = ({
  title,
  action,
  width,
  marginTop,
  margin,
  height,
  fontSize,
}) => {
  return (
    <div onClick={action}>
      <Button css={{ width, marginTop, margin, height, fontSize }}>{title}</Button>
    </div>
  );
};

export default MainButton;
