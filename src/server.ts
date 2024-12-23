import { Hono } from "hono";
import { serveStatic, upgradeWebSocket } from "hono/deno";
import { WSEvents } from "hono/ws";
import { ChatMessage } from "./components/ChatMessage.ts";

const app = new Hono();
app.use("*", serveStatic({ root: "./public" }));

app.get(
  "/ws",
  upgradeWebSocket((_c) => {
    return {
      onMessage(event: MessageEvent<string>, ws) {
        const messageJson = JSON.parse(event.data);
        const message = messageJson["chat_message"];
        ws.send(ChatMessage({ message }));
      },
    } as WSEvents;
  }),
);

Deno.serve(app.fetch);
