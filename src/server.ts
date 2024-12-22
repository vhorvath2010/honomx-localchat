import { Hono } from "hono";
import { serveStatic } from "hono/deno";

const app = new Hono();
app.use('*', serveStatic({ root: './public' }));

const api = new Hono();
api.get("/hello", (c) => c.text("Hello from Hono!"));

app.route("/api", api);
Deno.serve(app.fetch);
