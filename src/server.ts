import { Hono } from "hono";

const index = await Deno.readTextFile("./public/index.html");

const app = new Hono();
app.get("/", (c) => c.html(index));

const api = new Hono();
api.get("/hello", (c) => c.text("Hello from Hono!"));

app.route("/api", api);
Deno.serve(app.fetch);
