const UI_ROOT = "https://raw.githubusercontent.com/ricatelli/PasNM/main/ui/";
const UI_VERSION_URL = UI_ROOT + "version.json";
const LOCAL_VERSION_KEY = "pasnm_ui_version";

const btn = document.getElementById("install");
const status = document.getElementById("status");

async function getRemoteVersion() {
  const r = await fetch(UI_VERSION_URL, { cache: "no-store" });
  return (await r.json()).version;
}

function getLocalVersion() {
  return localStorage.getItem(LOCAL_VERSION_KEY);
}

async function installUI(version) {
  const files = [
    "index.html",
    "app.js",
    "ws.js",
    "state.js",
    "ui.css",
    "manifest.json",
    "sw.js"
  ];

  const cache = await caches.open("pasnm-ui-" + version);

  for (const f of files) {
    await cache.add(UI_ROOT + f);
  }

  localStorage.setItem(LOCAL_VERSION_KEY, version);
}

async function start() {
  try {
    const remote = await getRemoteVersion();
    const local = getLocalVersion();

    if (!local) {
      status.textContent = "Interfaz no instalada";
      btn.onclick = async () => {
        await installUI(remote);
        location.reload();
      };
      return;
    }

    if (local !== remote) {
      status.textContent = "Actualización disponible";
      btn.textContent = "Actualizar";
      btn.onclick = async () => {
        if (confirm("Actualizar interfaz?")) {
          await installUI(remote);
          location.reload();
        }
      };
      return;
    }

    // UI OK → redirigir
    location.href = UI_ROOT + "index.html";

  } catch (e) {
    status.textContent = "Error cargando interfaz";
    console.error(e);
  }
}

start();
