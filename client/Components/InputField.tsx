import React from 'react';
import styles from '../styles/Inputfield.module.scss';

interface propTypes {
  placeholder: string;
  setValue: Function;
  type: string;
}
const InputField = ({ placeholder, setValue, type }: propTypes) => {
  return (
    <div>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        onChange={({ target }) => {
          const { value } = target;
          setValue(value);
        }}
      />
    </div>
  );
};

export default InputField;
