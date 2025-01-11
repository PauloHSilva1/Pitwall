import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

function MenuMaq({ setRenderAtual }) {
  // Função para configurar o Dash
  const handleDash = async () => {
    setRenderAtual(4); // Alterar o estado para renderizar a configuração do Dash
  };

  // Função para customizar o sensor
  const handleMaqSelecionar = async () => {
    setRenderAtual(1); // Alterar o estado para renderizar a customização do sensor
  };
  const handleMaqCanais = async () => {
    setRenderAtual(2); // Alterar o estado para renderizar a parte da PDM
  };
  const handleMaqConfig = async () => {
    setRenderAtual(3); // Alterar o estado para renderizar a parte da PDM
  };
  const StyledButton = styled(Button)`
  background-color: #FF5733;
  color: #FFF;
  margin-right: 0.4vw;
  max-width: 15vw;
  max-height: 9vh;
  font-size: 0.75vw;
  &:hover {
    background-color: #C70039;
  }
`;

  return (
    <div style={{minWidth:'13vw', display: 'flex', flexDirection: 'row', paddingTop: '2vh', paddingLeft: '2vw' }}>
      <div style={{ display: 'flex', flexDirection: 'row',marginTop:'3vh' }}>
        
        <StyledButton onClick={handleMaqSelecionar}  variant='contained'>
          Selecionar configuração
        </StyledButton>
        <StyledButton onClick={handleMaqCanais}  variant='contained'>
          Canais
        </StyledButton>
        <StyledButton onClick={handleMaqConfig}  variant='contained'>
          Configuração do sistema
        </StyledButton>
      </div>
      
      
      
    </div>
  );
}

export default MenuMaq;
