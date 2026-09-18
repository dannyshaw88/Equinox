"use strict";

// src/trayMenuPreload.ts
var import_electron = require("electron");
import_electron.contextBridge.exposeInMainWorld("trayMenuAPI", {
  openApp: () => import_electron.ipcRenderer.send("tray-open"),
  restartApp: () => import_electron.ipcRenderer.send("tray-restart"),
  closeApp: () => import_electron.ipcRenderer.send("tray-close")
});
