// app.js
import { wsConnect } from "./ws.js";
import { bindUI } from "./ui.js";

window.addEventListener("load", () => {
  bindUI();
  wsConnect();
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then(() => console.log("SW OK"))
    .catch(err => console.error("SW ERR", err));
}
