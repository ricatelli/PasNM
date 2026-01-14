// state.js
export const state = {
  connected: false,

  sys: {
    uptime: 0,
    rssi: 0,
    heap: 0,
    ip: ""
  },

  outputs: {
    1: false,
    2: false,
    3: false,
    4: false
  },

  config: {
    name: "",
    mqtt: {},
    wifi: {}
  }
};
