const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (jsonData, filePath) => ipcRenderer.invoke('saveFile', jsonData, filePath) // Chama o manipulador 'saveFile'
});
