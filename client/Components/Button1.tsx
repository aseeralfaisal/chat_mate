import React from 'react';
import styles from '../styles/Button1.module.scss';

const Button1 = ({ title }) => {
  return (
    <div>
      <button className={styles.button1}>{title}</button>
    </div>
  );
};

export default Button1;
