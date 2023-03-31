type user = {
  id: number;
  username: string;
};
export type usersType = {
  users: user[];
  username: string;
  toUsername: string;
  messages: string[];
  createChatRoom: (value: string) => void;
  textInputVal: string;
  setTextInputVal: (value: string) => void;
  sendMessageAction: () => void;
};
