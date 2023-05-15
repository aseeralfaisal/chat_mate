import React, { useState } from 'react';
import { emojis } from './emojipanel.data.json';
import InputField from '../InputField/inputfield.component';
import * as Uicons from '@iconscout/react-unicons';
import { EmojiContainer, EmojiMenu, Span } from './emojipanel.styles';
import colors from '../../styles/colors';

const EmojiPanel: React.FC = () => {
  const [SearchValue, setSearchValue] = useState('');
  const emojiData = emojis.map(({ category, emoji }, index) => {
    if (category.startsWith('Smileys & Emotion')) {
      return <Span key={index}>{emoji}</Span>;
    }
  });

  return (
    <div>
      <EmojiMenu>
        <div
          style={{
            width: '100%',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            padding: 16,
            zIndex: 2,
            overflow: 'hidden',
          }}>
          <InputField
            value={SearchValue}
            setValue={setSearchValue}
            placeholder='Search'
            height={32}
            type='text'
            startIcon={<Uicons.UilSearch size={20} color={colors.gray} />}
          />
        </div>
        <EmojiContainer>{emojiData}</EmojiContainer>
      </EmojiMenu>
    </div>
  );
};

export default EmojiPanel;
