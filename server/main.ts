import { createServer, Server as HTTPServer } from "http";
import { MainServerService } from "./services/server-service";
import { SocketService } from "./services/socket-service";

const PORT = 4001;
const httpServer: HTTPServer = createServer();

const server = new MainServerService(httpServer);
const socket = new SocketService(httpServer);

server.start();
httpServer.listen(PORT, () => {
  console.log(`Server -> ${PORT}`);
});

socket.listen(() => {
  console.log(`Socket -> ${PORT}`);
});
