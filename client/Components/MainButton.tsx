import React from 'react';
import styles from '../styles/Button1.module.scss';

type MainButtonTypes = {
  title: string;
  action: () => void;
  width?: number;
  height?: number;
  marginTop?: number;
  margin?: number;
  fontSize?: number;
};

const MainButton: React.FC<MainButtonTypes> = ({
  title,
  action,
  width,
  marginTop,
  margin,
  height,
  fontSize,
}) => {
  return (
    <div onClick={action}>
      <button className={styles.button1} style={{ width, marginTop, margin, height, fontSize }}>
        {title}
      </button>
    </div>
  );
};

export default MainButton;
