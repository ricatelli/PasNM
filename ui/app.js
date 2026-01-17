import { wsConnect, wsSend } from "./ws.js";
import { updateState, bindToggle } from "./state.js";

bindToggle((ch, value) => {
  wsSend({
    cmd: "set",
    ch: Number(ch),
    value: value
  });
});

wsConnect(msg => {
  updateState(msg);
});
