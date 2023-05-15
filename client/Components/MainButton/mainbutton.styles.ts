import { styled } from '@stitches/react';
import colors from '../../styles/colors';

export const Button = styled('button', {
  backgroundColor: colors.purple400,
  color: colors.light100,
  width: 300,
  border: 'none',
  height: 50,
  borderRadius: 16,
  fontSize: 16,
  marginTop: 10,
  transition: 'ease-out 0.2s all',
  '&:hover': {
    backgroundColor: colors.purple300,
  },
  '&:active': {
    backgroundColor: colors.purple400,
  },
});
