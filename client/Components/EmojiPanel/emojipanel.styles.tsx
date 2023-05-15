import { styled } from '@stitches/react';
import colors from '../../styles/colors';

export const EmojiMenu = styled('div', {
  width: 340,
  height: 340,
  position: 'fixed',
  top: 300,
  left: 50,
  background: colors.dark100,
  border: `1.5px solid ${colors.gray200}`,
  borderRadius: 10,
  overflowY: 'scroll',
  overflowX: 'hidden',
  '&::-webkit-scrollbar-button': {
    height: 3,
  },

  '&::-webkit-scrollbar': {
    width: 10,
    backgroundColor: 'transparent',
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: colors.gray100,
    borderRadius: 10,
  },
});

export const EmojiContainer = styled('div', {
  display: 'grid',
  gap: 10,
  gridTemplateColumns: 'repeat(4, 1fr)',
});

export const Span = styled('span', {
  fontSize: 32,
  display: 'flex',
  justifyContent: 'center',
  cursor: 'context-menu',
  '&:hover': {
    background: colors.gray200,
    borderRadius: 5,
  },
});
