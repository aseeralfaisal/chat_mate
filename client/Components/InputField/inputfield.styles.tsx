import { styled } from '@stitches/react';
import themes from '../../styles/stitches.config';

const { colors } = themes.theme;

export const Input = styled('div', {
  backgroundColor: colors.dark,
  color: colors.light,
  border: `1px solid ${colors.dark}`,
  fontSize: 18,
  outline: 'none',
  width: 300,
  height: 50,
  padding: '0 10px',
  display: 'flex',
  alignItems: 'center',
  borderRadius: 14,
  margin: '14px 0',
  transition: 'ease-in-out 0.3s all',
  '& input': {
    color: colors.light100,
    background: 'none',
    border: 'none',
    outline: 'none',
    paddingInline: 10
  },
  '&:hover, &:focus': {
    border: `${colors.purple100} 1px solid`,
  },
  '&::placeholder': {
    color: colors.light,
    opacity: 1,
  },
});