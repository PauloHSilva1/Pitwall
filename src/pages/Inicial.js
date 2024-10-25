import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Button, Stack, ListItem, ListItemText, Typography, ListItemButton } from '@mui/material';
import { ProjectContext } from '../elements/ProjectContext'; // Importa o contexto
import logo from '../logopitwall.png';

function Inicial() {
  const recentProjects = '../recentProjects.cefast'
  const [projectData, setProjectData] = useState([]);
  const { setProjectFilePath } = useContext(ProjectContext); // Usando o contexto
  const navigate = useNavigate();
  

  const newProjectHandler = () => {
    const projectContent = {
      name: `Novo Projeto ${projectData.length + 1}`,
      description: "Este é um novo projeto criado.",
      config:{}
    };

    const fileContent = JSON.stringify(projectContent, null, 2);
    const blob = new Blob([fileContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectContent.name}.cefast`;
    link.click();

    URL.revokeObjectURL(url);
    setProjectData([...projectData, projectContent]);
  };

  const openProjectHandler = async () => {
    try {
      const { filePath, fileContent } = await window.electronAPI.openFile();
      if (fileContent) {
        const jsonData = JSON.parse(fileContent);
        setProjectFilePath(filePath); // Armazena o caminho do arquivo no contexto
        navigate('/home', { state: jsonData });
      }
    } catch (error) {
      console.error("Erro ao abrir o arquivo:", error);
    }
  };
  
  
  

  return (
    <div className="App" style={{ display: 'flex', height: '100vh', backgroundColor: '#eeeeee' }}>
      <div className="ProjetoInicial" style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center', paddingLeft: '15vw', paddingTop: '25vh' }}>
        <img src={logo} alt="logo" style={{ width: '20vw', height: '35vh' }} />
        <Stack spacing={3} direction="row">
          <Button
            variant="contained"
            onClick={newProjectHandler}
            style={{ fontSize: '1.1vw', height: '7vh', width: '15vw', backgroundColor: '#ffe0e1', color: 'black', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
            New project
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={openProjectHandler}
            style={{ fontSize: '1.1vw', height: '7vh', width: '15vw', backgroundColor: '#ffe0e1', color: 'black', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
            Open project
          </Button>
        </Stack>
      </div>
      <div className='ProjetosRecentes' style={{ display: 'flex', flexDirection: 'column', paddingLeft: '25vh', justifyContent: 'center', alignItems: 'flex-start' }}>
        <Typography variant="h4" style={{ marginBottom: '10px', color: '#333' }}>
          Projetos Recentes
        </Typography>
        <List>
          {projectData.map((project, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton style={{ backgroundColor: '#ffe0e0', marginBottom: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <ListItemText primary={project.name} secondary={project.description} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}

export default Inicial;
