import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { ProjectContext } from '../elements/ProjectContext';
import Checkbox from '@mui/material/Checkbox';
import Menu from '../elements/Menu'
import Sidebar from './Sidebar';
import MenuPdm from '../elements/MenuPdm';
import OutputConfig from './outputconfig';
import CanInputsConfig from './caninputs'
import InputsConfig from './inputsconfig'
function Pdm(){
  const { projectFilePath, setProjectFilePath } = useContext(ProjectContext); // Obtendo o filePath e setProjectFilePath do contexto
  const location = useLocation();
  const [renderAtual, setRenderAtual] = useState(0); // Estado para controlar o render
 
  const initialProjectData = location.state; // Dados passados via state
  
  // Usando useState para gerenciar projectData
  const [projectData, setProjectData] = useState(initialProjectData);
  const handleSend = async()=>{
    handleSave()
    
  }
  const handleSave = async () => {
    const jsonData = JSON.stringify(projectData, null, 2); // Converte os dados do projeto para JSON

    // Verifica se o projectFilePath está definido
    if (!projectFilePath) {
      console.error('Caminho do arquivo não definido');
      return;
    }

    try {
      const response = await window.electronAPI.saveFile(jsonData, projectFilePath); // Passa o caminho e os dados
      if (response) {
        console.log('Arquivo salvo com sucesso!');
      } else {
        console.error('Erro ao salvar o arquivo');
      }
    } catch (error) {
      console.error('Erro ao chamar saveFile:', error);
    }
  };
  

  // Função para lidar com a alteração da escolha
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Atualiza o estado de projectData de forma imutável
    setProjectData((prevData) => ({
      ...prevData,
      config: {
        ...prevData.config,
        [name]: value, // Atualiza a propriedade específica
      },
    }));
  };
 

    return(
      <div>
        <MenuPdm setRenderAtual={setRenderAtual}/> 
        {renderAtual === 1 && <OutputConfig />}
        {renderAtual === 2 && <CanInputsConfig />}
        {renderAtual === 3 && <InputsConfig />}

        <h1>PDm pAge</h1>
  
       
      </div>
)
}
export default Pdm