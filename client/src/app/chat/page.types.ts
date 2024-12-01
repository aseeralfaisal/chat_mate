export type Message = {
  id: number
  sender: string
  content: string
  timestamp: string
}

export type User = {
  id: number
  name: string
  avatar: string
  status: 'online' | 'offline'
}
