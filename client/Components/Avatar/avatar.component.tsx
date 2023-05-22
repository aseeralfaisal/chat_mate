import React from 'react';
import { AvatarContainer } from './avatar.styles';
import type { AvatarProps } from './avatar.types';
import colors from '../../styles/colors';

const Avatar: React.FC<AvatarProps> = ({
  username = 'A',
  width = 50,
  height = width,
  color = colors.purple100,
  fontSize = 14,
}) => {
  return (
    <AvatarContainer css={{ width, height, fontSize, background: color }}>
      {username.slice(0, 1)}
    </AvatarContainer>
  );
};

export default Avatar;
