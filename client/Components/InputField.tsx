import React from 'react';
import styles from '../styles/Inputfield.module.scss';

const InputField = ({ placeholder }) => {
  return (
    <div>
      <input className={styles.input} type='text' placeholder={placeholder} />
    </div>
  );
};

export default InputField;
