// Estado central de la UI
// No hay lógica acá, solo datos

const state = {
  connected: false,

  sys: {
    ip: "",
    time: ""
  },

  channels: [
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 4, value: 0 }
  ]
};

window.UIState = state;
