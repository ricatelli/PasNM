// ui.js
import { state } from "./state.js";
import { toggleOutput } from "./actions.js";

export function renderOutput(ch) {
  const btn = document.querySelector(`#out${ch}`);
  btn.classList.toggle("on", state.outputs[ch]);
}

export function renderAll() {

  // conexión
  document.body.classList.toggle("offline", !state.connected);

  // sys
  document.querySelector("#rssi").textContent = state.sys.rssi;
  document.querySelector("#uptime").textContent = state.sys.uptime;

  // outputs
  for (let ch in state.outputs) {
    renderOutput(ch);
  }
}

export function bindUI() {
  document.querySelectorAll("[data-out]").forEach(btn => {
    btn.onclick = () => {
      const ch = btn.dataset.out;
      toggleOutput(ch, !state.outputs[ch]);
    };
  });
}
