import { keyframes, styled } from '@stitches/react';
import colors from '../../styles/colors';

const SlideBottom = keyframes({
  '0%': {
    '-webkit-transform': 'translateZ(-80px)',
    transform: 'translateZ(-80px)',
    opacity: 0,
  },
  '100%': {
    '-webkit-transform': 'translateZ(0)',
    transform: 'translateZ(0)',
    opacity: 1,
  },
});

export const Alert = styled('div', {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  backgroundColor: colors.red200,
  borderRadius: 10,
  padding: 6,
  fontSize: 14,
  color: colors.light100,
  animation: `${SlideBottom} 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
});
