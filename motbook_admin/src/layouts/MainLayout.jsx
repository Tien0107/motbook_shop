import { Box } from '@mui/material';
import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const MainLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Header />
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - 240px)` },
                    ml: { sm: '240px' },
                    mt: '64px'
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default MainLayout;