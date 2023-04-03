import React from 'react';
import { Button } from './styles/MainButton.styles';

type MainButtonTypes = {
  title: string;
  action: () => void;
  width?: number;
  height?: number;
  marginTop?: number;
  margin?: number;
  fontSize?: number;
};

const MainButton: React.FC<MainButtonTypes> = ({
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
