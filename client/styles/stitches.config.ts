import { createStitches } from '@stitches/react';

const themes = createStitches({
  theme: {
    colors: {
      purple: '#7c5cfc',
      purple100: '#664ccf',
      purple200: '#513aad',
      purple300: '#664ccf66',
      purple400: '#664ccf33',
      light: '#cccccc',
      light100: '#ffffff',
      dark: '#292d32',
      // dark100: '#1c1d22',
      dark100: '#16181c',
      dark200: '#16191c',
      dark300: '#141416',
      gray: '#37393ccc',
      gray100: '#26272d',
    },
  },
});

export default themes;
