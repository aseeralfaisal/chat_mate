type user = {
  id: number;
  username: string;
};
export type ChatType = {
  users: user[];
  username: string;
  recieverName: string;
  messages: string[];
  createChatRoom: (value: string) => void;
  messageValue: string;
  setMessageValue: (value: string) => void;
  sendMessageAction: () => void;
};

export type MessageType = {
  username: string,
  text: string
}