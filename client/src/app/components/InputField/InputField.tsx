"use client";

import { Input } from '@lib'
import type { InputFieldType } from './InputField.types'

const InputField: React.FC<InputFieldType> = ({
  value,
  placeholder,
  variant = "flat",
  onChange,
  type = "text",
  startContent = null,
  endContent = null,
  className = "",
  height = "",
  onKeyPress
}) => {
  return (
    <Input placeholder={placeholder} required variant={variant} type={type}
      onKeyPress={onKeyPress}
      onChange={onChange}
      value={value}
      className={className}
      classNames={{
        label: "text-black/50 dark:text-white/90",
        input: [
          "bg-transparent",
          "text-black/90 dark:text-white",
          "placeholder:text-default-700 dark:placeholder:text-white/60",
        ],
        innerWrapper: "bg-transparent",
        inputWrapper: [
          "shadow-xl",
          "bg-slate-800",
          "dark:bg-slate-800",
          "backdrop-blur-xl",
          "backdrop-saturate-200",
          "hover:bg-slate-700",
          "dark:hover:bg-slate-800",
          "dark:focus-within:!bg-slate-700/10",
          "!cursor-text",
          height
        ],
      }}
      startContent={startContent}
      endContent={endContent}
    />
  )
}

export default InputField
