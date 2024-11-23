import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

export class SocketService {
  private io: SocketIOServer;

  constructor(httpServer: HTTPServer) {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
      },
    });
    this.connect();
  }

  public listen(callback: Function) {
    callback();
  }

  private connect() {
    this.io.on("connection", (socket: Socket) => {
      socket.on('join', (roomId) => this.handleJoin(socket, roomId));
      socket.on('start_call', (roomId) => this.handleStartCall(socket, roomId))
      socket.on('offer', (event) => this.handleOffer(socket, event));
      socket.on('answer', (event) => this.handleAnswer(socket, event));
      socket.on('ice_candidate', (event) => this.handleIceCandidate(socket, event));
    });
  }

  private handleJoin(socket: Socket, roomId: string) {
    const selectedRoom = this.io.sockets.adapter.rooms.get(roomId)
    const numberOfClients = selectedRoom ? selectedRoom.size : 0

    if (numberOfClients === 0) {
      console.log(`Creating room ${roomId} and emitting room_created socket event`)
      socket.join(roomId)
      socket.emit('room_created', roomId)
    } else if (numberOfClients === 1) {
      console.log(`Joining room ${roomId} and emitting room_joined socket event`)
      socket.join(roomId)
      socket.emit('room_joined', roomId)
    } else {
      console.log(`Can't join room ${roomId}, emitting full_room socket event`)
      socket.emit('full_room', roomId)
    }
  }

  private handleStartCall(socket: Socket, roomId: string) {
    console.log(`Broadcasting start_call event to peers in room ${roomId}`)
    socket.to(roomId).emit('start_call')
  }

  private handleOffer(socket: Socket, event: { roomId: string, sdp: string }) {
    console.log(`Broadcasting offer event to peers in room ${event.roomId}`)
    socket.to(event.roomId).emit('offer', event.sdp)
  }

  private handleAnswer(socket: Socket, event: { roomId: string, sdp: string }) {
    console.log(`Broadcasting answer event to peers in room ${event.roomId}`)
    socket.to(event.roomId).emit('answer', event.sdp)
  }

  private handleIceCandidate(socket: Socket, event: { roomId: string, candidate: string }) {
    console.log(`Broadcasting ice_candidate event to peers in room ${event.roomId}`)
    socket.to(event.roomId).emit('ice_candidate', event)
  }
}
