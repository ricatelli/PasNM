let ws;
let handler = () => {};

export function wsConnect(onMessage) {
  handler = onMessage;

  ws = new WebSocket(`ws://${location.hostname}:81/`);

  ws.onopen = () => {
    console.log("WS conectado");
    ws.send(JSON.stringify({ cmd: "getConfig" }));
  };

  ws.onmessage = e => {
    const msg = JSON.parse(e.data);
    handler(msg);
  };

  ws.onclose = () => {
    console.warn("WS cerrado, reintentando...");
    setTimeout(() => wsConnect(handler), 2000);
  };
}

export function wsSend(obj) {
  if (ws?.readyState === 1) {
    ws.send(JSON.stringify(obj));
  }
}
