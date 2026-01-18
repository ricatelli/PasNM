const ESP_IP = "192.168.5.172";
const WS_PORT = 81;

let ws;

export function wsConnect() {
  ws = new WebSocket(`ws://${ESP_IP}:${WS_PORT}/`);

  ws.onopen = () => console.log("WS conectado");
  ws.onmessage = e => console.log("WS RX:", e.data);
  ws.onclose = () => console.log("WS cerrado");
}
