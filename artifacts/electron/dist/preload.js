"use strict";

// src/preload.ts
var import_electron = require("electron");
import_electron.contextBridge.exposeInMainWorld("electronAPI", {
  checkForUpdates: () => import_electron.ipcRenderer.invoke("check-for-updates"),
  openLog: () => import_electron.ipcRenderer.invoke("open-log"),
  createBackup: () => import_electron.ipcRenderer.invoke("backup-create"),
  listBackups: () => import_electron.ipcRenderer.invoke("backup-list"),
  restoreBackup: (id) => import_electron.ipcRenderer.invoke("backup-restore", id),
  deleteBackup: (id) => import_electron.ipcRenderer.invoke("backup-delete", id),
  openBackupDir: () => import_electron.ipcRenderer.invoke("backup-open-dir"),
  updateBackupSchedule: (enabled, intervalDays) => import_electron.ipcRenderer.send("backup-schedule-update", { enabled, intervalDays }),
  openBrowserWindow: (profileId, username, userAgent) => import_electron.ipcRenderer.invoke("open-browser-window", { profileId, username, userAgent }),
  openSignupBrowserWindow: (opts) => import_electron.ipcRenderer.invoke("open-signup-browser-window", opts),
  clearSignupBrowserCache: () => import_electron.ipcRenderer.invoke("clear-signup-browser-cache"),
  openCsvTemp: (args) => import_electron.ipcRenderer.invoke("open-csv-temp", args),
  saveCsvDialog: (args) => import_electron.ipcRenderer.invoke("save-csv-dialog", args),
  pickEqxFolder: () => import_electron.ipcRenderer.invoke("pick-eqx-folder"),
  writeEqxFiles: (args) => import_electron.ipcRenderer.invoke("write-eqx-files", args),
  exportEqxToFolder: (files) => import_electron.ipcRenderer.invoke("export-eqx-folder", files),
  writeEqxToDownloads: (files) => import_electron.ipcRenderer.invoke("write-eqx-downloads", files),
  focusBrowserWindow: (profileId) => import_electron.ipcRenderer.invoke("focus-browser-window", profileId),
  getAutostart: () => import_electron.ipcRenderer.invoke("get-autostart"),
  setAutostart: (enable) => import_electron.ipcRenderer.invoke("set-autostart", enable),
  settingsGet: (key) => import_electron.ipcRenderer.invoke("settings-get", key),
  settingsSet: (key, value) => import_electron.ipcRenderer.invoke("settings-set", key, value),
  settingsGetAll: () => import_electron.ipcRenderer.invoke("settings-get-all"),
  openFolderDialog: () => import_electron.ipcRenderer.invoke("open-folder-dialog"),
  countFolderFiles: (folderPath) => import_electron.ipcRenderer.invoke("count-folder-files", folderPath)
});
