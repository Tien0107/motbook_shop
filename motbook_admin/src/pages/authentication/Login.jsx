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
import LoginForm from '../../features/auth/components/LoginForm';

export default function Login() {
    // const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <LoginForm />
                    <Grid item>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>

                    <Grid item sx={{ mt: 3 }}>
                        <Link href="/auth/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}
