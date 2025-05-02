import {
    Box,
    Container,
    Grid,
    Link,
    Paper,
    Typography
} from '@mui/material';
import React from 'react';
// import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../features/auth/components/RegisterForm';

export default function Register() {
    // const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <RegisterForm />
                    <Grid item container justifyContent={'center'} sx={{ mt: 3 }}>
                        <Link href="/auth/login" variant="body2">
                            {"Already have an account? Sign in"}
                        </Link>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}
