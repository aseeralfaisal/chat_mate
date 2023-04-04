import { styled } from '@stitches/react';
import themes from '../styles/stitches.config';

const { colors } = themes.theme;

export const Form = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '25vh',
});

export const FormChild = styled('div', {
  backgroundColor: colors.dark200,
  height: '340px',
  width: '570px',
  borderRadius: '12px',
  alignItems: 'center',
  border: `1px solid ${colors.purple300}`,
  display: 'flex',
});

export const Register = styled('div', {
  margin: '10px 0',
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
});

export const Action = styled('label', {
  color: colors.purple,
  fontSize: '14px',
  margin: '5px',
  transition: 'ease-out 0.2s all',
  cursor: 'pointer',
  '&:hover': {
    color: colors.purple100,
  },
});

export const Description = styled('label', {
  color: '#ffffff',
  fontSize: '14px',
});

export const Title = styled('h2', {
  fontSize: '30px',
  color: colors.purple,
  fontWeight: 'normal',
  userSelect: 'none',
  variants: {
    size: {
      small: {
        fontSize: 12,
      },
      medium: {
        fontSize: 18,
      },
      large: {
        fontSize: 26,
      },
    },
  },
});
