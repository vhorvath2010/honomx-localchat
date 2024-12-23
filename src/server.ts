import { Hono } from "hono";
import { serveStatic, upgradeWebSocket } from "hono/deno";
import { WSEvents } from "hono/ws";
import { ChatMessage } from "./components/ChatMessage.ts";
import { ChatInput } from "./components/ChatInput.ts";

const app = new Hono();
app.use("*", serveStatic({ root: "./public" }));

app.get(
  "/ws",
  upgradeWebSocket((_c) => {
    return {
      onMessage(event: MessageEvent<string>, ws) {
        const chatMessage = JSON.parse(event.data)["chat_message"];
        ws.send(ChatMessage({ message: chatMessage, sentByUser: true }));
      },
      onOpen(_event, ws) {
        ws.send(ChatInput());
      },
    } as WSEvents;
  })
);

Deno.serve(app.fetch);
