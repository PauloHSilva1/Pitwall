import React from 'react';
import { Button, Typography,TextField,Select,MenuItem} from '@mui/material';
import { styled } from '@mui/system';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

// Botão estilizado com styled-components do MUI
const StyledButton = styled(Button)`
  color: #FFF;
  margin-right: 0.4vw;
  max-width: 15vw;
  max-height: 9vh;
  font-size: 0.75vw;
`;

function MaqSelecionar() {
  // Dados da tabela
  const rows = [
    { name: 'John', age: 28, city: 'New York' },
    { name: 'Anna', age: 24, city: 'London' },
    { name: 'Mike', age: 32, city: 'Sydney' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5vh', marginLeft: '2vw' }}>
      {/* Botões */}
      <div style={{ marginBottom: '2vh' }}>
        <StyledButton variant="contained">New</StyledButton>
        <StyledButton variant="contained">Delete</StyledButton>
      </div>

      {/* Tabela */}
      <TableContainer component={Paper} style={{maxHeight:'75vh', width: '78vw' }}>
        <Table>
          <TableHead>
            <TableRow style={{maxHeight: '1vh',width:'100%'}}>
              <TableCell style={{height:'0.5vh',fontSize:'1.5vh'}}>Nome</TableCell>
              <TableCell style={{height:'0.5vh',fontSize:'1.5vh'}}>Veículo</TableCell>
              <TableCell style={{height:'0.5vh',fontSize:'1.5vh'}}>DataLogger Model</TableCell>
              <TableCell style={{height:'0.5vh',fontSize:'1.5vh'}}>Velocidade</TableCell>
              <TableCell style={{height:'0.5vh',fontSize:'1.5vh'}}>Temperatura</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} style={{height: '1vh',width:'100%'}}>
                <TableCell style={{height:'0.5vh',fontSize:'1.5vh',maxWidth:'5vw'}}></TableCell>
                <TableCell style={{height:'0.5vh',fontSize:'1.5vh',maxWidth:'5vw'}}><Select style={{minWidth:'10vw'}}><MenuItem>sla</MenuItem></Select></TableCell>
                <TableCell style={{height:'0.5vh',fontSize:'1.5vh',maxWidth:'5vw'}}><Select style={{minWidth:'10vw'}}><MenuItem>sla</MenuItem></Select></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MaqSelecionar;
