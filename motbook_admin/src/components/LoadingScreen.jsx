import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const LoadingScreen = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default LoadingScreen;
