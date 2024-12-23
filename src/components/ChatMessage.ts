import { html } from "typed-htmx";

interface ChatMessageParams {
  readonly message: string;
}

export function ChatMessage({ message }: ChatMessageParams) {
  return html` <div id="chat_room" hx-swap-oob="beforeend">
    <p>${{ $$child: message }}</p>
  </div>`;
}
