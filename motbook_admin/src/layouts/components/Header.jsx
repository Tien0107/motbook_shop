import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';

const Header = () => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    MotBook
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                {/* Add user menu or other header items here */}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
