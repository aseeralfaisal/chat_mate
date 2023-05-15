import React from "react";

export type MainButtonProps = {
  title: string;
  action: React.MouseEventHandler<HTMLDivElement>;
  width?: number;
  height?: number;
  marginTop?: number;
  margin?: number;
  fontSize?: number;
  type?: 'button' | 'reset' | 'submit';
};
