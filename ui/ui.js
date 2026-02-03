/* ui.js
 * Render y lógica visual
 */

const UI = {

  renderSysInfo() {
    const el = document.getElementById("sysinfo");
    if (!State.sys) {
      el.textContent = "Sin conexión";
      return;
    }

    el.textContent =
      `ESP ${State.sys.device || ""} | ` +
      `Uptime ${State.sys.uptime || "?"}s`;
  },

  renderChannels() {
    const cont = document.getElementById("channels");
    cont.innerHTML = "";

    for (let i = 1; i <= State.channels; i++) {
      const on = State.outputs[i];

      const btn = document.createElement("button");
      btn.textContent = `Canal ${i}: ${on ? "ON" : "OFF"}`;
      btn.className = on ? "on" : "off";

      btn.onclick = () => API.toggleChannel(i);

      cont.appendChild(btn);
    }
  }
};

// ---------- inicio ----------

window.addEventListener("load", () => {
  WS.connect();

  // pedidos iniciales
  API.requestSysInfo();
  API.requestConfig();
});
