import { wsConnect } from "./ws.js";

// SOLO conectar WS si la UI corre desde HTTP (ESP)
if (location.protocol === "http:") {
  wsConnect();
} else {
  console.log("UI en HTTPS (instalación / actualización)");
}
