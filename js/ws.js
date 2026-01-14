import { state } from "./state.js";
import { renderAll, renderOutput } from "./ui.js";
const ESP_WS_URL = "ws://192.168.5.172:81/";

let ws;

export function wsConnect() {
  ws = new WebSocket(ESP_WS_URL);

  ws.onopen = () => {
    console.log("WS conectado");
  };

  ws.onclose = () => {
    console.log("WS desconectado");
  };

  ws.onmessage = e => {
    const msg = JSON.parse(e.data);
    console.log("WS RX:", msg);
  };
}

function routeMessage(msg) {
  switch (msg.type) {

    case "state":
      state.outputs[msg.ch] = msg.val;
      renderOutput(msg.ch);
      break;

    case "config":
      state.config = msg.data;
      renderAll();
      break;

    case "sys":
      state.sys = msg.data;
      renderAll();
      break;

    case "ack":
      console.log("ACK:", msg.cmd);
      break;

    case "err":
      console.error("ERR:", msg.code, msg.msg);
      alert(msg.msg);
      break;
  }
}

export function wsSend(obj) {
  if (ws && ws.readyState === 1) {
    ws.send(JSON.stringify(obj));
  }
}
