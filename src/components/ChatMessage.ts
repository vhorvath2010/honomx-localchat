import { html } from "typed-htmx";

interface ChatMessageParams {
  readonly message: string;
  readonly sentByUser?: boolean; // Optional boolean parameter
}

export function ChatMessage({
  message,
  sentByUser = false,
}: ChatMessageParams) {
  if (!sentByUser) {
    return html`
      <div id="chat_room" hx-swap-oob="beforeend">
        <p>${{ $$child: message }}</p>
      </div>
    `;
  }

  return html`
    <input
      id="chat_input"
      name="chat_message"
      type="text"
      class="border-2 rounded-md border-slate-900"
      autofocus
      required
      hx-target="#chat_input"
      hx-swap="outerHTML"
    />
    <div id="chat_room" hx-swap-oob="beforeend">
      <p>you: ${{ $$child: message }}</p>
    </div>
  `;
}
