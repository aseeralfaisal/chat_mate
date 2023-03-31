import React from 'react';
import styles from '../styles/Button1.module.scss';

type MainButtonTypes = {
  title: string;
  action: () => void;
  width?: number;
  marginTop?: number;
  margin?: number;
};

const MainButton: React.FC<MainButtonTypes> = ({ title, action, width, marginTop, margin }) => {
  return (
    <div onClick={action}>
      <button
        className={styles.button1}
        style={{ width: width && width, marginTop: marginTop && marginTop, margin: margin && margin }}>
        {title}
      </button>
    </div>
  );
};

export default MainButton;
