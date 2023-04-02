type user = {
  id: number;
  username: string;
};
export type chatType = {
  users: user[];
  username: string;
  recieverName: string;
  messages: string[];
  createChatRoom: (value: string) => void;
  textInputVal: string;
  setTextInputVal: (value: string) => void;
  sendMessageAction: () => void;
};
