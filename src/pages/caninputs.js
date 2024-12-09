import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CanInputsConfig() {
    const navigate =useNavigate();
  const [canInputs, setCanInputs] = useState([
    { id: 1, name: 'CAN Input 1', source: 'CAN Bus', canType:'ExtId',canId: 100, offset: 2 },
    { id: 2, name: 'CAN Input 2', source: 'CAN Bus',canType:'StdId', canId: 101, offset: 4 },
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
    setCanInputs((prevInputs) =>
      prevInputs.map((input) => (input.id === selectedInput.id ? selectedInput : input))
    );
    handleDialogClose();
  };

  return (
    <div>
      <h2>CAN Inputs Configuration</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Source</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>CAN ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>CAN Type</th>

            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Offset</th>
          </tr>
        </thead>
        <tbody>
          {canInputs.map((input) => (
            <tr key={input.id} onClick={() => handleRowClick(input)} style={{ cursor: 'pointer' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{input.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{input.source}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{input.canId}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{input.canType}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{input.offset}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit CAN Input</DialogTitle>
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
              <TextField
                label="CAN ID"
                value={selectedInput.canId}
                onChange={(e) => handleInputChange('canId', e.target.value)}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Offset"
                value={selectedInput.offset}
                onChange={(e) => handleInputChange('offset', e.target.value)}
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

export default CanInputsConfig;
