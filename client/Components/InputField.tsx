import React from 'react';
import { useAppDispatch } from '../redux/hooks';
import styles from '../styles/Inputfield.module.scss';

interface propTypes {
  placeholder: string;
  setValue: (value: string) => void;
  type: string;
  value: string;
  reduxValue?: boolean;
  width?: number;
}
const InputField = ({ placeholder, setValue, type, value, reduxValue, width }: propTypes) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <input
        className={styles.input}
        style={{ width: width && width }}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={({ target }) => {
          const { value } = target;
          reduxValue ? dispatch(setValue(value)) : setValue(value);
        }}
      />
    </div>
  );
};

export default InputField;
