const fs = require('fs');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
module.exports = {
    openFile: (filePath,jsonData) =>{
      if (!filePath || typeof filePath !== 'string') {
        console.error('Caminho do arquivo inválido:', filePath);
        throw new Error('filePath deve ser uma string válida');
      }
    
      try {
        fs.writeFileSync(filePath, jsonData);
        return true;
      } catch (err) {
        console.error('Erro ao salvar arquivo', err);
        return false;
        }
    }
  };
