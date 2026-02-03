/* api.js
 * Protocolo UI ↔ ESP
 */

const API = {

  handleMessage(msg) {
    if (!msg.evt) return;

    switch (msg.evt) {

      case "sysInfo":
        State.sys = msg;
        UI.renderSysInfo();
        break;

      case "state":
        State.updateChannel(msg.ch, msg.value);
        UI.renderChannels();
        break;

      case "config":
        State.config = msg;
        UI.renderChannels();
        break;

      case "uiUpToDate":
        console.log("[UI] ya actualizada", msg.version);
        break;

      case "uiUpdateStart":
        console.log("[UI] update start", msg.version);
        break;

      case "uiUpdateFile":
        console.log(`[UI] ${msg.index}/${msg.total} ${msg.file}`);
        break;

      case "uiUpdateDone":
        console.log("[UI] update OK", msg.version);
        break;

      case "uiUpdateError":
        console.error("[UI] update error", msg);
        break;

      default:
        console.warn("Evento desconocido", msg);
    }
  },

  // ---------- comandos ----------

  toggleChannel(ch) {
    WS.send({
      cmd: "toggle",
      ch
    });
  },

  requestConfig() {
    WS.send({ cmd: "getConfig" });
  },

  requestSysInfo() {
    WS.send({ cmd: "getSysInfo" });
  },

  requestUIUpdate() {
    WS.send({ cmd: "updateUI" });
  }
};
