// actions.js
import { wsSend } from "./ws.js";

export function toggleOutput(ch, val) {
  wsSend({
    cmd: "set",
    ch: ch,
    val: val
  });
}

export function requestConfig() {
  wsSend({ cmd: "getConfig" });
}

export function requestSys() {
  wsSend({ cmd: "getSys" });
}
