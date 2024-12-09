import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

function MenuPdm({ setRenderAtual }) {
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
    <div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Button onClick={handleDash} style={{ marginTop: '5vh' }} variant='contained'>
          Inicio
        </Button>
        <Button onClick={handleDash} style={{ marginTop: '5vh' }} variant='contained'>
          Output Config
        </Button>
        <Button onClick={handleCustomize} style={{ marginTop: '5vh' }} variant='contained'>
          Can Inputs
        </Button>
        <Button onClick={handlePDM} style={{ marginTop: '5vh' }} variant='contained'>
          Input Config
        </Button>
        
      </div>
      
      
      
    </div>
  );
}

export default MenuPdm;
