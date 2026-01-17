export const state = {
  outputs: {},     // ej: {1:true, 2:false}
  config: {},      // config completa
  sys: {},         // info sistema
  connected: false
};

export function updateState(msg) {
  switch (msg.type) {

    case "state":
      state.outputs[msg.ch] = msg.value;
      render();
      break;

    case "config":
      state.config = msg.data;
      render();
      break;

    case "sys":
      state.sys = msg.data;
      render();
      break;

    case "ack":
      console.log("ACK:", msg.cmd);
      break;

    case "err":
      alert("ESP error: " + msg.msg);
      break;
  }
}

export function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  Object.entries(state.outputs).forEach(([ch, val]) => {
    const b = document.createElement("button");
    b.className = val ? "on" : "off";
    b.textContent = `Salida ${ch}`;
    b.onclick = () => toggle(ch, !val);
    app.appendChild(b);
  });
}

// Hook dinámico (inyectado desde app.js)
let toggle = () => {};
export function bindToggle(fn) {
  toggle = fn;
}

document.body.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(()=>{});
  }
}, { once: true });
