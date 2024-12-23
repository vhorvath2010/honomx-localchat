import { Hono } from "hono";
import { serveStatic, upgradeWebSocket } from "hono/deno";
import { html } from "typed-htmx";

const app = new Hono();
app.use("*", serveStatic({ root: "./public" }));

app.get(
  "/ws",
  upgradeWebSocket((_c) => {
    return {
      onMessage(event, ws) {
        console.log("received message", event);
        ws.send(html`
          <div id="chat_room" hx-swap-oob="beforeend">
            <p>
              message
            </p>
          </div>
          `);
      },
    };
  }),
);

Deno.serve(app.fetch);
