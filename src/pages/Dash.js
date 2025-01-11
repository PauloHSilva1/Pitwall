import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { ProjectContext } from '../elements/ProjectContext';
import Checkbox from '@mui/material/Checkbox';
import Sensores from '../elements/Sensores';
import telaDisplay from '../telaDisplay.png'
import Menu from '../elements/Menu'

function Dash(){
  const { projectFilePath, setProjectFilePath } = useContext(ProjectContext); // Obtendo o filePath e setProjectFilePath do contexto
  const location = useLocation();
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
    <div style={{display:'flex',flexDirection:'row', paddingLeft:'20vw',justifyContent:'right',alignItems:'center'}}>
        <img style={{maxWidth:'40vw',maxHeight:'40vh'}} src={telaDisplay} alt='IMG do display não encontrada'/>
        <div style={{display:'flex',flexDirection:'column',paddingLeft:'3vw'}}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p style={{}}>Dado1: {projectData.config.data1}</p>
        <Checkbox/>
        <Sensores name={'data1'} value={projectData.config.data1} onChange={handleChange} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '2vh' }}>
        <p>Dado2: {projectData.config.data2}</p>
        <Checkbox/>
        <Sensores name={'data2'} value={projectData.config.data2} onChange={handleChange} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '2vh' }}>
        <p>Dado3: {projectData.config.data3}</p>
        <Checkbox/>
        <Sensores name={'data3'} value={projectData.config.data3} onChange={handleChange} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '2vh' }}>
        <p style={{ }}>Dado4: {projectData.config.data4}</p>
        <Checkbox/>
        <Sensores name={'data4'} value={projectData.config.data4} onChange={handleChange} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '2vh' }}>
        <p style={{ }}>Dado5: {projectData.config.data5}</p>
        <Checkbox/>
        <Sensores name={'data5'} value={projectData.config.data5} onChange={handleChange} />
        </div>
        <div style={{marginTop:'3vh'}}>
        <Button style={{marginLeft:'7.5vw',marginRight:'1vw',maxwidth:'5vw',maxHeight:'5vh'}} variant='contained' onClick={handleSave}>Save</Button>
        <Button style={{maxwidth:'5vw',maxHeight:'5vh'}} variant='contained' onClick={handleSend}>Send</Button>
        </div>
      </div>
      </div>
)
}
export default Dash