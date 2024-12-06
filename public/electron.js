const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const exec = require('child_process')
const openFile = require('./openFile.js');
const saveFile = require('./saveFile.js')



let mainWindow;
let port; // Declare o port fora da função

// Função para criar a janela principal
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL('http://localhost:3000'); // Ou caminho para seu build do React
}

// Inicializa o aplicativo
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Encerrar o aplicativo quando todas as janelas estiverem fechadas
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Função para abrir a porta serial


// Ouve a requisição de abertura de arquivo
ipcMain.handle('dialog:openFile', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Custom Files', extensions: ['cefast', 'json'] }],
  });

  if (!canceled && filePaths.length > 0) {
    const filePath = filePaths[0];
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return { filePath, fileContent }; // Retorna um objeto com caminho e conteúdo do arquivo
  }
  return null;
});

// Ouve a requisição de salvar arquivo
ipcMain.handle('saveFile', async (event, jsonData, filePath) => {
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
});

ipcMain.handle('openSensor',async()=>{
  saveFile()

})

ipcMain.handle('saveSensor',async(event,jsonData,filePath)=>{
  openFile(filePath,jsonData)
})


