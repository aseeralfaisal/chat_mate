import React from 'react';
import { useAppDispatch } from '../redux/hooks';
import { Input } from './styles/Inputfield.styles';
import { InputFieldProps } from './types/InputField.types';

const InputField: React.FC<InputFieldProps> = (props) => {
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
    event,
  } = props;

  const dispatch = useAppDispatch();

  return (
    <Input css={{ width, height }}>
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
    </Input>
  );
};

export default InputField;
