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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <IconContent>{startIcon}</IconContent>
      <Input
        style={{ width, height, fontSize }}
        type={type}
        value={value}
        placeholder={placeholder}
        onKeyDown={(e) => e.key === 'enter' && event()}
        onChange={(e) => {
          return reduxValue ? dispatch(setValue(e.target.value)) : setValue(e.target.value);
        }}
      />
      <IconContent>{endIcon}</IconContent>
    </div>
  );
};

export default InputField;
