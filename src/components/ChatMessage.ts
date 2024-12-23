import { html } from "typed-htmx";
import { ChatInput } from "./ChatInput.ts";

interface ChatMessageParams {
  readonly message: string;
  readonly sentByUser?: boolean;
}

export function ChatMessage({
  message,
  sentByUser = false,
}: ChatMessageParams) {
  if (!sentByUser) {
    return html`
      <div id="chat_room" hx-swap-oob="beforeend">
        <p class="self-end">${{ $$child: message }}</p>
      </div>
    `;
  }

  return html`
    ${{ $$child: ChatInput() }}
    <div id="chat_room" hx-swap-oob="beforeend">
      <p>you: ${{ $$child: message }}</p>
    </div>
  `;
}
