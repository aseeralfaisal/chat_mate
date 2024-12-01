export type InputFieldType = {
  placeholder: any
  variant?: "underlined" | "bordered" | "faded" | "flat"
  type?: "email" | "text" | "password"
  startContent?: JSX.Element | null
  endContent?: JSX.Element | null
  className?: string
  height?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
}
