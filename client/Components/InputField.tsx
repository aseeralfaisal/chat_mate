import React from 'react';
import styles from '../styles/Inputfield.module.scss';

const InputField = ({ placeholder, setValue }: { placeholder: string; setValue: Function }) => {
  return (
    <div>
      <input
        className={styles.input}
        type='text'
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default InputField;
