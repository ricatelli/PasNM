let ws;

export function wsConnect() {
  const host = location.hostname;
  ws = new WebSocket(`ws://${host}:81/`);

  ws.onopen = () => console.log("WS conectado");
  ws.onmessage = e => console.log("WS RX:", e.data);
  ws.onclose = () => console.log("WS cerrado");
}
