import React, { useState } from 'react';
import UserIcon from './dp.svg';
import styles from './chat-page.styles.module.scss';
import Image from 'next/image';

const SearchIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_219_1068)'>
      <path
        d='M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.867 18 18 14.867 18 11C18 7.132 14.867 4 11 4C7.132 4 4 7.132 4 11C4 14.867 7.132 18 11 18ZM19.485 18.071L22.314 20.899L20.899 22.314L18.071 19.485L19.485 18.071V18.071Z'
        fill='white'
      />
    </g>
    <defs>
      <clipPath id='clip0_219_1068'>
        <rect width='24' height='24' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const AddMessage = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_219_893)'>
      <path
        d='M14 3V5H4V18.385L5.763 17H20V10H22V18C22 18.2652 21.8946 18.5196 21.7071 18.7071C21.5196 18.8946 21.2652 19 21 19H6.455L2 22.5V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H14ZM19 3V0H21V3H24V5H21V8H19V5H16V3H19Z'
        fill='white'
      />
    </g>
    <defs>
      <clipPath id='clip0_219_893'>
        <rect width='24' height='24' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const Menu = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_219_894)'>
      <path
        d='M12 3C11.175 3 10.5 3.675 10.5 4.5C10.5 5.325 11.175 6 12 6C12.825 6 13.5 5.325 13.5 4.5C13.5 3.675 12.825 3 12 3ZM12 18C11.175 18 10.5 18.675 10.5 19.5C10.5 20.325 11.175 21 12 21C12.825 21 13.5 20.325 13.5 19.5C13.5 18.675 12.825 18 12 18ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z'
        fill='white'
      />
    </g>
    <defs>
      <clipPath id='clip0_219_894'>
        <rect width='24' height='24' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const chatMessages = [
  {
    profile: UserIcon,
    name: 'Lara Miller',
    text: 'Makes to a illustrated on all and Hey, I heard that you wanted. Makes to a illustrated on all',
  },
  {
    profile: UserIcon,
    name: 'Cameron Williamson',
    text: 'Hey, I heard that you wanted...',
  },
  {
    profile: UserIcon,
    name: 'Jenny Wilson',
    text: 'For sure! Let’s hangout on Sund...',
  },
  {
    profile: UserIcon,
    name: 'Aaron Zimmer',
    text: 'No 😅 I just went to bed right...',
  },
  {
    profile: UserIcon,
    name: 'Annette Black',
    text: 'Ooooh thank you so much! ❤️',
  },
  {
    profile: UserIcon,
    name: 'Jane Cooper',
    text: 'But I’m not really sure how it is...',
  },
  {
    profile: UserIcon,
    name: 'Anna Newman',
    text: 'Best day ever 😂😂',
  },
  {
    profile: UserIcon,
    name: 'Dianne Russell',
    text: 'No problem! See you then.',
  },
  {
    profile: UserIcon,
    name: 'Dianne Russell',
    text: 'No problem! See you then.',
  },
];

const ChatPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__top__section}>
        <Image src={UserIcon} alt={'UserIcon'} />
        <div className={styles.sidebar__top__section__icons}>
          <AddMessage />
          <Menu />
        </div>
      </div>
      <div className={styles.sidebar__search}>
        <div className={styles.sidebar__search__container}>
          <input type='text' placeholder='Search' />
          <SearchIcon />
        </div>
      </div>
      <div className={styles.sidebar__devider} />
      <div className={styles.sidebar__title__container}>
        <h5 className={styles.sidebar__title}>Messages</h5>
      </div>
      <div className={styles.sidebar__chat}>
        {chatMessages.map((chat, idx) => (
          <div
            key={idx}
            className={styles.sidebar__chat__user}
            onClick={() => setSelectedIndex(idx)}
            style={{ background: selectedIndex === idx ? '#141416' : 'none' }}>
            <Image src={chat.profile} alt={'Profile'} />
            <div className={styles.sidebar__chat__content}>
              <h3 className={styles.sidebar__chat__content__title}>{chat.name}</h3>
              <p className={styles.sidebar__chat__content__text}>{chat.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
