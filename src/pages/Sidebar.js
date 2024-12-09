import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, Drawer } from '@mui/material';

function Sidebar({ options }) {
    const navigate = useNavigate();

    return (
        <Drawer
            variant="permanent"
            anchor="top"
            sx={{
                width: 220,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 220, boxSizing: 'border-box' },
            }}
        >
            <List>
                {options.map((option) => (
                    <ListItem 
                        button 
                        key={option.id} 
                        onClick={() => navigate(option.path)}
                    >
                        <ListItemText primary={option.label} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;
