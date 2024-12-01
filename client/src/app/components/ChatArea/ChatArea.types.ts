export type ChatAreaProps = {
  messages: {
    id: number
    sender: string
    content: string
    timestamp: string
  }[];
  handleSendMessage: () => void
  onOpen: () => void
  inputMessage: string
  setInputMessage: (value: string) => void
}
