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

const MicIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_231_803)'>
      <path
        d='M12 3C11.2044 3 10.4413 3.31607 9.87868 3.87868C9.31607 4.44129 9 5.20435 9 6V10C9 10.7956 9.31607 11.5587 9.87868 12.1213C10.4413 12.6839 11.2044 13 12 13C12.7956 13 13.5587 12.6839 14.1213 12.1213C14.6839 11.5587 15 10.7956 15 10V6C15 5.20435 14.6839 4.44129 14.1213 3.87868C13.5587 3.31607 12.7956 3 12 3ZM12 1C12.6566 1 13.3068 1.12933 13.9134 1.3806C14.52 1.63188 15.0712 2.00017 15.5355 2.46447C15.9998 2.92876 16.3681 3.47995 16.6194 4.08658C16.8707 4.69321 17 5.34339 17 6V10C17 11.3261 16.4732 12.5979 15.5355 13.5355C14.5979 14.4732 13.3261 15 12 15C10.6739 15 9.40215 14.4732 8.46447 13.5355C7.52678 12.5979 7 11.3261 7 10V6C7 4.67392 7.52678 3.40215 8.46447 2.46447C9.40215 1.52678 10.6739 1 12 1ZM3.055 11H5.07C5.31229 12.6648 6.14587 14.1867 7.41823 15.2873C8.6906 16.3879 10.3167 16.9936 11.999 16.9936C13.6813 16.9936 15.3074 16.3879 16.5798 15.2873C17.8521 14.1867 18.6857 12.6648 18.928 11H20.944C20.7166 13.0287 19.8066 14.9199 18.3632 16.3635C16.9198 17.8071 15.0287 18.7174 13 18.945V23H11V18.945C8.97114 18.7176 7.07978 17.8074 5.63618 16.3638C4.19257 14.9202 3.28241 13.0289 3.055 11Z'
        fill='white'
      />
    </g>
    <defs>
      <clipPath id='clip0_231_803'>
        <rect width='24' height='24' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const FaceIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_231_789)'>
      <path
        d='M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM7 13H9C9 13.7956 9.31607 14.5587 9.87868 15.1213C10.4413 15.6839 11.2044 16 12 16C12.7956 16 13.5587 15.6839 14.1213 15.1213C14.6839 14.5587 15 13.7956 15 13H17C17 14.3261 16.4732 15.5979 15.5355 16.5355C14.5979 17.4732 13.3261 18 12 18C10.6739 18 9.40215 17.4732 8.46447 16.5355C7.52678 15.5979 7 14.3261 7 13ZM8 11C7.60218 11 7.22064 10.842 6.93934 10.5607C6.65804 10.2794 6.5 9.89782 6.5 9.5C6.5 9.10218 6.65804 8.72064 6.93934 8.43934C7.22064 8.15804 7.60218 8 8 8C8.39782 8 8.77936 8.15804 9.06066 8.43934C9.34196 8.72064 9.5 9.10218 9.5 9.5C9.5 9.89782 9.34196 10.2794 9.06066 10.5607C8.77936 10.842 8.39782 11 8 11ZM16 11C15.6022 11 15.2206 10.842 14.9393 10.5607C14.658 10.2794 14.5 9.89782 14.5 9.5C14.5 9.10218 14.658 8.72064 14.9393 8.43934C15.2206 8.15804 15.6022 8 16 8C16.3978 8 16.7794 8.15804 17.0607 8.43934C17.342 8.72064 17.5 9.10218 17.5 9.5C17.5 9.89782 17.342 10.2794 17.0607 10.5607C16.7794 10.842 16.3978 11 16 11Z'
        fill='white'
      />
    </g>
    <defs>
      <clipPath id='clip0_231_789'>
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
    <div className={styles.parent}>
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
      <div className={styles.chat__area}>
        <div className={styles.chat__area__header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Image src={UserIcon} alt='' />
            <h3 className={styles.chat__area__header__user}>Lara Mueller</h3>
          </div>
          <div className={styles.chat__area__header__icons}>
            <SearchIcon />
            <Menu />
          </div>
        </div>
        <div className={styles.chat__area__section}>
          <div className={styles.chat__area__section__rightchat}>
            <div className={styles.chat__area__section__rightchat__chatbubble}>
              <p className={styles.chat__area__section__rightchat__texts}>
                Both with sisters first very to remodelling logbook due and attempt. Dropped him is the come
                comment a candidates, to pointing problem infinity, completely cheerful, help their found I
                payload them. Is if it facilitate live the with writers she more duckthemed together could
                still skyline.
              </p>
            </div>
            <div className={styles.chat__area__section__leftchat__chatbubble}>
              <p className={styles.chat__area__section__leftchat__texts}>
                Are hazardous sight rolled subordinates what his average many, to the feel among scent
                cleaning and behavioural written 😊
              </p>
            </div>
          </div>
        </div>
        <div className={styles.message__bar}>
          <FaceIcon />
          <div className={styles.search__bar}>
            <input type='text' placeholder='Write a message' />
          </div>
          <MicIcon />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
