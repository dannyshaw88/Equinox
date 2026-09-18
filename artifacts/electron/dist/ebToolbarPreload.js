"use strict";

// src/ebToolbarPreload.ts
var import_electron = require("electron");
import_electron.contextBridge.exposeInMainWorld("__eq", {
  command: (cmd, payload) => import_electron.ipcRenderer.invoke("eb-toolbar-cmd", cmd, payload)
});
