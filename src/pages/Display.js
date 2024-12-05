import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Menu from '../elements/Menu';
import Dash from '../pages/Dash';
import Customizar from '../pages/Customizar';
import { Divider, TextField } from '@mui/material';
import Pdm from '../pages/Pdm'
import Maq from '../pages/Maq'



function Display() {
  const location = useLocation();
  const initialProjectData = location.state; // Dados passados via state
  const [renderAtual, setRenderAtual] = useState(0); // Estado para controlar o render

  return (
    <div style={{ backgroundColor: '#eeeeee', height: '100vh', width: '100vw' }}>
      <div style={{ display: 'flex' }}>
        <Menu setRenderAtual={setRenderAtual} /> {/* Passando setRenderAtual para o filho */}
        <Divider 
          orientation="vertical" 
          style={{ marginLeft: '2vw', marginTop: '5vh', height: '90vh', borderWidth: '0.5px' }}
        />
        
          <div>
            {renderAtual === 1 && <Customizar />}
            {renderAtual === 2 && <Dash />}
            {renderAtual === 3 && <Pdm/>}
            {renderAtual === 4 && <Maq/>}
          </div>
        
      </div>
    </div>
  );
}

export default Display;
