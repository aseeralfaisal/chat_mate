import React from 'react';
import { IconContent, Input } from './inputfield.styles';
import { InputFieldProps } from './inputfield.types';

const InputField: React.FC<InputFieldProps> = (props) => {
  const { placeholder, setValue, type, value, width, height, fontSize, endIcon, startIcon } = props;

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <IconContent>{startIcon}</IconContent>
      <Input
        style={{ width, height, fontSize }}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
      <IconContent>{endIcon}</IconContent>
    </div>
  );
};

export default InputField;
