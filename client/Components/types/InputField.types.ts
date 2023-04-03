export type InputFieldProps = {
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