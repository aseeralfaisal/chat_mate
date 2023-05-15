import React from "react";

export type InputFieldProps = {
    placeholder: string;
    setValue: (value: string) => void;
    type: 'text' | 'password' | 'email';
    value: string;
    reduxValue?: boolean;
    width?: number | string;
    height?: number | string;
    fontSize?: number;
    endIcon?: JSX.Element;
    startIcon?: JSX.Element;
    event?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  };