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
}) => {
  return (
    <div onClick={action}>
      <Button css={{ marginTop, width, margin, height, fontSize }}>
        {title}
      </Button>
    </div>
  );
};

export default MainButton;
