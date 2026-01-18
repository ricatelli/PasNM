export function wsConnect() {
  if (location.protocol !== "http:") {
    console.warn("WS bloqueado: origen HTTPS");
    return;
  }

  const host = location.hostname;
  const ws = new WebSocket(`ws://${host}:81/`);

  ws.onopen = () => console.log("WS conectado");
  ws.onmessage = e => console.log("WS RX:", e.data);
  ws.onclose = () => console.log("WS cerrado");
}
