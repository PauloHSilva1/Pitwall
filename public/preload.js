const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (jsonData, filePath) => ipcRenderer.invoke('saveFile', jsonData, filePath), // Chama o manipulador 'saveFile'
  openSensor: () => ipcRenderer.invoke('openSensor') ,
  saveSensor:(jsonData,filePath)=>ipcRenderer.invoke('saveSensor',jsonData,filePath)
});
