type user = {
  id: number;
  username: string;
};
export type usersType = {
  users: user[];
  username: string;
  recieverName: string;
  messages: string[];
  createChatRoom: (value: string) => void;
  messageValue: string;
  setMessageValue: (value: string) => void;
  sendMessageAction: () => void;
};
