const fs = require('fs');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
module.exports = {
    saveFile: async()=> {
      const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Custom Files', extensions: ['sens'] }],
      });
    
      if (!canceled && filePaths.length > 0) {
        const filePath = filePaths[0];
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return { filePath, fileContent }; // Retorna um objeto com caminho e conteúdo do arquivo
      }
      return null;
    
    }
  }