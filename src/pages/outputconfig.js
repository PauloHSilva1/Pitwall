import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function OutputConfig() {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([
    { number: 1, pin: 'P1', rating: '5A', channel: 'CH1', maxCurrent: '10A', retryDelay: '100ms', retryCount: 3, retryShutdown: 'Yes', stayAlive: 'No', control: 'Manual' },
    { number: 2, pin: 'P2', rating: '3A', channel: 'CH2', maxCurrent: '15A', retryDelay: '200ms', retryCount: 2, retryShutdown: 'No', stayAlive: 'Yes', control: 'Auto' },
    { number: 3, pin: 'P3', rating: '12A', channel: 'CH3', maxCurrent: '20A', retryDelay: '150ms', retryCount: 5, retryShutdown: 'Yes', stayAlive: 'Yes', control: 'Auto' },
    { number: 4, pin: 'P4', rating: '24A', channel: 'CH4', maxCurrent: '25A', retryDelay: '300ms', retryCount: 1, retryShutdown: 'No', stayAlive: 'No', control: 'Manual' },
    { number: 5, pin: 'P5', rating: '8A', channel: 'CH5', maxCurrent: '8A', retryDelay: '50ms', retryCount: 4, retryShutdown: 'Yes', stayAlive: 'Yes', control: 'Auto' },
  ]);

  const [selectedChannel, setSelectedChannel] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRowClick = (channel) => {
    setSelectedChannel(channel);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedChannel(null);
  };

  const handleInputChange = (field, value) => {
    if (field === 'rating') {
      // Ensure only numbers are allowed and append "A" for amps
      const numericValue = value.replace(/\D/g, ''); // Remove all non-numeric characters
      setSelectedChannel({ ...selectedChannel, [field]: numericValue ? `${numericValue}A` : '' });
    } else {
      setSelectedChannel({ ...selectedChannel, [field]: value });
    }
  };

  const handleSave = () => {
    setChannels((prevChannels) =>
      prevChannels.map((ch) => (ch.number === selectedChannel.number ? selectedChannel : ch))
    );
    handleDialogClose();
  };

  return (
    <div>
      <h2>Output Configuration</h2>

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Number</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Pin</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rating</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Channel</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Max Current</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Retry Delay</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Retry Count</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Retry Shutdown</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Stay Alive</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Control</th>
          </tr>
        </thead>
        <tbody>
          {channels.map((channel) => (
            <tr key={channel.number} onClick={() => handleRowClick(channel)} style={{ cursor: 'pointer' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{channel.number}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{channel.pin}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{channel.rating}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{channel.channel}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{channel.maxCurrent}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{channel.retryDelay}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{channel.retryCount}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{channel.retryShutdown}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{channel.stayAlive}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{channel.control}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog for editing */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit Channel</DialogTitle>
        <DialogContent>
          {selectedChannel && (
            <div>
              <TextField
                label="Number"
                value={selectedChannel.number}
                disabled
                fullWidth
                margin="dense"
              />
              <TextField
                label="Pin"
                value={selectedChannel.pin}
                disabled
                fullWidth
                margin="dense"
              />
              <TextField
                label="Rating"
                value={selectedChannel.rating}
                disabled
                fullWidth
                margin="dense"
              />
              <TextField
                label="Channel"
                value={selectedChannel.channel}
                disabled
                fullWidth
                margin="dense"
              />
              <TextField
                label="Max Current"
                value={selectedChannel.maxCurrent}
                onChange={(e) => handleInputChange('maxCurrent', e.target.value)}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Retry Delay"
                value={selectedChannel.retryDelay}
                onChange={(e) => handleInputChange('retryDelay', e.target.value)}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Retry Count"
                value={selectedChannel.retryCount}
                onChange={(e) => handleInputChange('retryCount', e.target.value)}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Retry Shutdown"
                value={selectedChannel.retryShutdown}
                onChange={(e) => handleInputChange('retryShutdown', e.target.value)}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Stay Alive"
                value={selectedChannel.stayAlive}
                onChange={(e) => handleInputChange('stayAlive', e.target.value)}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Control"
                value={selectedChannel.control}
                onChange={(e) => handleInputChange('control', e.target.value)}
                fullWidth
                margin="dense"
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>


    </div>
  );
}

export default OutputConfig;
