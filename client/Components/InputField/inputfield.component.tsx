import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { IconContent, Input } from './inputfield.styles';
import { InputFieldProps } from './inputfield.types';

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
    startIcon,
  } = props;

  const dispatch = useAppDispatch();

  return (
    <div>
      <IconContent>{startIcon}</IconContent>
      <Input
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
      <IconContent>{endIcon}</IconContent>
    </div>
  );
};

export default InputField;
