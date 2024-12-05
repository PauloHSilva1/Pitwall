import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

function Menu({ setRenderAtual }) {
  // Função para configurar o Dash
  const handleDash = async () => {
    setRenderAtual(2); // Alterar o estado para renderizar a configuração do Dash
  };

  // Função para customizar o sensor
  const handleCustomize = async () => {
    setRenderAtual(1); // Alterar o estado para renderizar a customização do sensor
  };
  const handlePDM = async () => {
    setRenderAtual(3); // Alterar o estado para renderizar a parte da PDM
  };
  const handleMAQ = async () => {
    setRenderAtual(4); // Alterar o estado para renderizar a parte da PDM
  };


  return (
    <div style={{minWidth:'13vw', display: 'flex', flexDirection: 'row', paddingTop: '2vh', paddingLeft: '2vw' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h4'>Projeto</Typography>
        <Typography variant='subtitle'>Descrição</Typography>
        <Button onClick={handleDash} style={{ marginTop: '5vh' }} variant='contained'>
          Configurar Dash
        </Button>
        <Button onClick={handleCustomize} style={{ marginTop: '5vh' }} variant='contained'>
          Customizar sensor
        </Button>
        <Button onClick={handlePDM} style={{ marginTop: '5vh' }} variant='contained'>
          PDM
        </Button>
        <Button onClick={handleMAQ} style={{ marginTop: '5vh' }} variant='contained'>
          MAQ
        </Button>
      </div>
      
      
      
    </div>
  );
}

export default Menu;
