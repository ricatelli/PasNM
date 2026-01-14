// app.js
import { wsConnect } from "./ws.js";
import { bindUI } from "./ui.js";

window.addEventListener("load", () => {
  bindUI();
  wsConnect();
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/PasNM/sw.js")
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.error("SW error", err));
}
