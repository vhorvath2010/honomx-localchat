import { Hono } from "hono";
import { getConnInfo, serveStatic, upgradeWebSocket } from "hono/deno";
import { WSEvents } from "hono/ws";
import { ChatInput } from "./components/ChatInput.ts";
import { ChatService } from "./chat/chatService.ts";

console.info("Registering static content...");
const app = new Hono();
app.use("*", serveStatic({ root: "./public" }));
console.info("Static content registered!");

console.info("Starting up chat service...");
const chatService = new ChatService();
app.get(
  "/ws",
  upgradeWebSocket((c) => {
    const connInfo = getConnInfo(c);
    return {
      onMessage(event: MessageEvent<string>, ws) {
        const chatMessage = JSON.parse(event.data)["chat_message"];
        chatService.sendMessage({ sender: ws, message: chatMessage });
      },
      onOpen(_event, ws) {
        console.info("Connecting socket for", connInfo.remote.address);
        chatService.connect(ws);
        ws.send(ChatInput());
      },
      onClose(_event, ws) {
        console.info("Disconnecting socket for", connInfo.remote.address);
        chatService.disconnect(ws);
      },
    } as WSEvents;
  })
);
console.info("Chat service started!");

Deno.serve(app.fetch);
