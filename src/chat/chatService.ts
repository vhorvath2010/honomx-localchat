import { WSContext } from "hono/ws";
import { ChatMessage } from "../components/ChatMessage.ts";

interface sendMessageParams {
  readonly sender: WSContext;
  readonly message: string;
}

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

  sendMessage({ sender, message }: sendMessageParams) {
    sender.send(ChatMessage({ message, sentByUser: true }));
    this.sockets.forEach((socket) => {
      if (socket !== sender) {
        socket.send(ChatMessage({ message }));
      }
    });
  }
}
