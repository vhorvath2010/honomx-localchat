import { html } from "typed-htmx";

export function ChatInput() {
  return html` <input
    id="chat_input"
    name="chat_message"
    type="text"
    class="border-2 rounded-md border-slate-900"
    autofocus
    required
    hx-target="#chat_input"
    hx-swap="outerHTML"
  />`;
}
