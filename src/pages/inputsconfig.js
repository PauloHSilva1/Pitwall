import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function InputsConfig() {
  const navigate =useNavigate();

  const [inputs, setInputs] = useState([
    { id: 1, name: 'Input 1', source: 'Pin', pin: 'P1' },
    { id: 2, name: 'Input 2', source: 'Pin', pin: 'P2' },
  ]);

  const [selectedInput, setSelectedInput] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRowClick = (input) => {
    setSelectedInput(input);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedInput(null);
  };

  const handleInputChange = (field, value) => {
    setSelectedInput({ ...selectedInput, [field]: value });
  };

  const handleSave = () => {
    setInputs((prevInputs) =>
      prevInputs.map((input) => (input.id === selectedInput.id ? selectedInput : input))
    );
    handleDialogClose();
  };

  return (
    <div>
      <h2>Inputs Configuration</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Source</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Pin</th>
          </tr>
        </thead>
        <tbody>
          {inputs.map((input) => (
            <tr key={input.id} onClick={() => handleRowClick(input)} style={{ cursor: 'pointer' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{input.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{input.source}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{input.pin}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit Input</DialogTitle>
        <DialogContent>
          {selectedInput && (
            <div>
              <TextField
                label="Name"
                value={selectedInput.name}
                disabled
                fullWidth
                margin="dense"
              />
              <Select
                value={selectedInput.source}
                onChange={(e) => handleInputChange('source', e.target.value)}
                fullWidth
                margin="dense"
              >
                <MenuItem value="Pin">Pin</MenuItem>
              </Select>
              <TextField
                label="Pin"
                value={selectedInput.pin}
                onChange={(e) => handleInputChange('pin', e.target.value)}
                fullWidth
                margin="dense"
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
   
    </div>
    
  );
}

export default InputsConfig;
