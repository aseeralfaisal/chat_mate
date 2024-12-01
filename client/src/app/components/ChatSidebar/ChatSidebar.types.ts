export type user = {
  id: number
  name: string
  status: 'online' | 'offline'
}

export type SidebarProps = {
  isSidebarOpen: boolean;
  isLeftSidebar: boolean;
  sideBarDragEnd: () => void;
  toggleSidebar: () => void;
  handleSendMessage: () => void;
  users: user[];
}

