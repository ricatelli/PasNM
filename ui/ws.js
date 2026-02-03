// ws.js — WebSocket manager

(() => {
  const RECONNECT_MS = 3000;

  let ws = null;
  let reconnectTimer = null;

  function wsUrl() {
    const proto = location.protocol === "https:" ? "wss://" : "ws://";
    return proto + location.hostname + ":81/";
  }

  function connect() {
    if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    console.log("[WS] connecting...");
    ws = new WebSocket(wsUrl());

    ws.onopen = () => {
      console.log("[WS] connected");
      clearTimeout(reconnectTimer);
      UIState.setSys("ws", "connected");
    };

    ws.onclose = () => {
      console.warn("[WS] disconnected");
      UIState.setSys("ws", "disconnected");
      scheduleReconnect();
    };

    ws.onerror = (e) => {
      console.error("[WS] error", e);
      ws.close();
    };

    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        handleMessage(msg);
      } catch (err) {
        console.warn("[WS] invalid JSON", e.data);
      }
    };
  }

  function scheduleReconnect() {
    if (reconnectTimer) return;
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null;
      connect();
    }, RECONNECT_MS);
  }

  function handleMessage(msg) {
    if (!msg || !msg.evt) return;

    switch (msg.evt) {

      case "sysInfo":
        if (msg.sys) UIState.updateSys(msg.sys);
        break;

      case "state":
        if (msg.ch != null && msg.value != null) {
          UIState.setChannel(msg.ch, msg.value);
        }
        break;

      case "config":
        if (msg.config) UIState.setConfig(msg.config);
        break;

      case "uiUpdateStart":
      case "uiUpdateFile":
      case "uiUpdateDone":
      case "uiUpdateError":
      case "uiUpToDate":
        UIState.pushEvent(msg);
        break;

      default:
        console.warn("[WS] unknown evt:", msg.evt, msg);
    }
  }

  function send(obj) {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.warn("[WS] send failed, not connected");
      return;
    }
    ws.send(JSON.stringify(obj));
  }

  // API pública
  window.WS = {
    connect,
    send,
    isConnected: () => ws && ws.readyState === WebSocket.OPEN
  };

})();
