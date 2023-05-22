export type InputFieldProps = {
    placeholder: string;
    setValue: (value: string) => void;
    type: 'text' | 'password' | 'email';
    value: string;
    width?: number | string;
    height?: number | string;
    fontSize?: number;
    endIcon?: JSX.Element;
    startIcon?: JSX.Element;
  };