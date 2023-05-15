import { styled } from '@stitches/react';
import colors from '../../styles/colors';

export const Input = styled('input', {
  background: colors.dark,
  border: `1px solid ${colors.dark}`,
  width: 300,
  height: 30,
  color: colors.light100,
  // padding: 10,
  outline: 'none',
  borderRadius: 14,
  transition: 'ease-in-out 0.3s all',
  paddingLeft: 40,
  '&:hover, &:focus, &:active': {
    border: `${colors.purple100} 1px solid`,
  },
  '&::placeholder': {
    color: colors.gray,
    opacity: 1,
  },
});

export const IconContent = styled('span', {
  position: 'absolute',
  marginTop: 6,
  marginInline: 12
});
