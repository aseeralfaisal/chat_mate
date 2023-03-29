import React, { useState } from 'react';
import UserIcon from './dp.svg';
import styles from './chat-page.styles.module.scss';
import Image from 'next/image';
import ProfilePNG from './profile.png';

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

const CloseIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_29_174)'>
      <path
        d='M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.05 18.364L5.636 16.95L10.586 12L5.636 7.04999L7.05 5.63599L12 10.586Z'
        fill='white'
      />
    </g>
    <defs>
      <clipPath id='clip0_29_174'>
        <rect width='24' height='24' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const StarIcon = () => (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_244_341)'>
      <path
        d='M8 12.1734L3.298 14.8054L4.348 9.52004L0.391335 5.86137L5.74267 5.22671L8 0.333374L10.2573 5.22671L15.6087 5.86137L11.652 9.52004L12.702 14.8054L8 12.1734ZM8 10.6454L10.8313 12.23L10.1987 9.04804L12.5807 6.84471L9.35867 6.46271L8 3.51671L6.64133 6.46337L3.41933 6.84471L5.80133 9.04804L5.16867 12.23L8 10.6454Z'
        fill='white'
      />
    </g>
    <defs>
      <clipPath id='clip0_244_341'>
        <rect width='16' height='16' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const RightIcon = () => (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_244_346)'>
      <path
        d='M8.78134 7.99999L5.48134 4.69999L6.424 3.75732L10.6667 7.99999L6.424 12.2427L5.48134 11.3L8.78134 7.99999Z'
        fill='white'
      />
    </g>
    <defs>
      <clipPath id='clip0_244_346'>
        <rect width='16' height='16' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const SettingsIcon = () => (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_244_350)'>
      <path
        d='M1.47533 9.37334C1.28361 8.46782 1.28361 7.53219 1.47533 6.62667C2.21533 6.71334 2.862 6.46867 3.07267 5.95934C3.284 5.44934 3.00067 4.81934 2.41533 4.35734C2.92003 3.58155 3.58155 2.92003 4.35733 2.41534C4.81867 3 5.44933 3.284 5.95933 3.07267C6.46933 2.86134 6.714 2.21534 6.62667 1.47534C7.53219 1.28361 8.46782 1.28361 9.37333 1.47534C9.28667 2.21534 9.53133 2.862 10.0407 3.07267C10.5507 3.284 11.1807 3.00067 11.6427 2.41534C12.4185 2.92003 13.08 3.58155 13.5847 4.35734C13 4.81867 12.716 5.44934 12.9273 5.95934C13.1387 6.46934 13.7847 6.714 14.5247 6.62667C14.7164 7.53219 14.7164 8.46782 14.5247 9.37334C13.7847 9.28667 13.138 9.53134 12.9273 10.0407C12.716 10.5507 12.9993 11.1807 13.5847 11.6427C13.08 12.4185 12.4185 13.08 11.6427 13.5847C11.1813 13 10.5507 12.716 10.0407 12.9273C9.53067 13.1387 9.286 13.7847 9.37333 14.5247C8.46782 14.7164 7.53219 14.7164 6.62667 14.5247C6.71333 13.7847 6.46867 13.138 5.95933 12.9273C5.44933 12.716 4.81933 12.9993 4.35733 13.5847C3.58155 13.08 2.92003 12.4185 2.41533 11.6427C3 11.1813 3.284 10.5507 3.07267 10.0407C2.86133 9.53067 2.21533 9.286 1.47533 9.37334V9.37334ZM2.66667 8.14C3.4 8.34334 4.00467 8.808 4.30467 9.53067C4.604 10.254 4.50467 11.0107 4.13 11.672C4.194 11.74 4.26 11.806 4.328 11.87C4.99 11.4953 5.746 11.3967 6.46933 11.6953C7.192 11.9953 7.65667 12.6 7.86 13.3333C7.95333 13.336 8.04667 13.336 8.14 13.3333C8.34333 12.6 8.808 11.9953 9.53067 11.6953C10.254 11.396 11.0107 11.4953 11.672 11.87C11.74 11.806 11.806 11.74 11.87 11.672C11.4953 11.01 11.3967 10.254 11.6953 9.53067C11.9953 8.808 12.6 8.34334 13.3333 8.14C13.336 8.04667 13.336 7.95334 13.3333 7.86C12.6 7.65667 11.9953 7.192 11.6953 6.46934C11.396 5.746 11.4953 4.98934 11.87 4.328C11.8058 4.26027 11.7397 4.19425 11.672 4.13C11.01 4.50467 10.254 4.60334 9.53067 4.30467C8.808 4.00467 8.34333 3.4 8.14 2.66667C8.04668 2.6642 7.95332 2.6642 7.86 2.66667C7.65667 3.4 7.192 4.00467 6.46933 4.30467C5.746 4.604 4.98933 4.50467 4.328 4.13C4.26 4.194 4.194 4.26 4.13 4.328C4.50467 4.99 4.60333 5.746 4.30467 6.46934C4.00467 7.192 3.4 7.65667 2.66667 7.86C2.664 7.95334 2.664 8.04667 2.66667 8.14V8.14ZM8 10C7.46957 10 6.96086 9.78929 6.58579 9.41422C6.21071 9.03915 6 8.53044 6 8C6 7.46957 6.21071 6.96086 6.58579 6.58579C6.96086 6.21072 7.46957 6 8 6C8.53043 6 9.03914 6.21072 9.41421 6.58579C9.78929 6.96086 10 7.46957 10 8C10 8.53044 9.78929 9.03915 9.41421 9.41422C9.03914 9.78929 8.53043 10 8 10ZM8 8.66667C8.17681 8.66667 8.34638 8.59643 8.47141 8.47141C8.59643 8.34638 8.66667 8.17682 8.66667 8C8.66667 7.82319 8.59643 7.65362 8.47141 7.5286C8.34638 7.40358 8.17681 7.33334 8 7.33334C7.82319 7.33334 7.65362 7.40358 7.5286 7.5286C7.40357 7.65362 7.33333 7.82319 7.33333 8C7.33333 8.17682 7.40357 8.34638 7.5286 8.47141C7.65362 8.59643 7.82319 8.66667 8 8.66667V8.66667Z'
        fill='white'
      />
    </g>
    <defs>
      <clipPath id='clip0_244_350'>
        <rect width='16' height='16' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

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
      <div className={styles.chat__details}>
        <div className={styles.chat__details__header}>
          <CloseIcon />
          <span className={styles.chat__details__header__title}>Contact info</span>
        </div>
        <div className={styles.profile__container}>
          <Image src={ProfilePNG} alt='' style={{ width: 180, height: 180, objectFit: 'contain' }} />
          <div className={styles.profile__description}>
            <span className={styles.status__title}>Lara Mueller</span>
            <span className={styles.status__description}>+49 1522 792358</span>
          </div>
        </div>
        <div className={styles.status}>
          <span className={styles.status__title}>Status</span>
          <span className={styles.status__description}>Chilling</span>
        </div>
        <div className={styles.function__section}>
          <div className={styles.function__section__button}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <StarIcon />
              <span className={styles.info}>Marked messages</span>
            </div>
            <RightIcon />
          </div>
          <div className={styles.function__section__button}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <SettingsIcon />
              <span className={styles.info}>Settings</span>
            </div>
            <RightIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
