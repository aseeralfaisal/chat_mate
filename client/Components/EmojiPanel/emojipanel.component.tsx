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
      return (
        <Span key={index} onClick={() => console.log(emoji)}>
          {emoji}
        </Span>
      );
    }
  });

  return (
    <EmojiMenu css={{ left: 320 }}>
      <div style={{ position: 'fixed', width: 330 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: 50,
            paddingTop: 10,
            backgroundColor: colors.dark100,
            borderRadius: 12,
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
      </div>
      <EmojiContainer>{emojiData}</EmojiContainer>
    </EmojiMenu>
  );
};

export default EmojiPanel;
