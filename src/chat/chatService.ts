import { WSContext } from "hono/ws";

export class ChatService {
  private sockets: WSContext[];

  constructor() {
    this.sockets = [];
  }

  connect(socket: WSContext) {
    this.sockets.push(socket);
  }

  disconnect(socket: WSContext) {
    const indexOfSocket = this.sockets.indexOf(socket);
    if (indexOfSocket !== -1) {
      this.sockets.splice(indexOfSocket, 1);
    }
  }
}
