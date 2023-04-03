import React from 'react';
import { useAppDispatch } from '../redux/hooks';
import styles from '../styles/Inputfield.module.scss';

type PropTypes = {
  placeholder: string;
  setValue: (value: string) => void;
  type: string;
  value: string;
  reduxValue?: boolean;
  width?: number | string;
  height?: number | string;
  fontSize?: number;
  endIcon?: JSX.Element;
  event?: () => void;
};

const InputField: React.FC<PropTypes> = (props) => {
  const {
    placeholder,
    setValue,
    type,
    value,
    reduxValue = false,
    width,
    height,
    fontSize,
    endIcon,
    event
  } = props;

  const dispatch = useAppDispatch();

  return (
    <div className={styles.input} style={{ width, height }}>
      <input
        style={{ width, height, fontSize }}
        type={type}
        value={value}
        placeholder={placeholder}
        onKeyDown={({ key }) => key === 'Enter' && event()}
        onChange={({ target }) => {
          const { value } = target;
          reduxValue ? dispatch(setValue(value)) : setValue(value);
        }}
      />
      {endIcon && endIcon}
    </div>
  );
};

export default InputField;
