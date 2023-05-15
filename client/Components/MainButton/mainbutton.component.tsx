import React from 'react';
import { Button } from './mainbutton.styles';
import { MainButtonProps } from './mainbutton.types';

const MainButton: React.FC<MainButtonProps> = ({
  title,
  action,
  width,
  marginTop,
  margin,
  height,
  fontSize,
  type = 'button',
}) => {
  return (
    <div onClick={action}>
      <Button type={type} css={{ marginTop, width, margin, height, fontSize }}>
        {title}
      </Button>
    </div>
  );
};

export default MainButton;
