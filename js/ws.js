// ws.js
import { state } from "./state.js";
import { renderAll, renderOutput } from "./ui.js";

let ws;

export function wsConnect() {
  ws = new WebSocket(`ws://${location.host}/ws`);

  ws.onopen = () => {
    state.connected = true;
    renderAll();
  };

  ws.onclose = () => {
    state.connected = false;
    renderAll();
  };

  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    routeMessage(msg);
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
