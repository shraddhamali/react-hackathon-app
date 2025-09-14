import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Alert,
    Container
} from '@mui/material';
import { HealthAndSafety, MedicalServices } from '@mui/icons-material';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Add CSS animation for gradient effect
    useEffect(() => {
        const gradientAnimation = `
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;

        const style = document.createElement('style');
        style.textContent = gradientAnimation;
        document.head.appendChild(style);

        // Cleanup function to remove the style when component unmounts
        return () => {
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        };
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        setError('');

        const isValid = email.trim().length > 0 && password.trim().length > 0;
        if (!isValid) {
            setError('Please enter email and password.');
            return;
        }

        sessionStorage.setItem('isAuthenticated', 'true');
        navigate('/');
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 50%, #e8f5e8 100%)',
                display: 'flex',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `
                        radial-gradient(circle at 20% 20%, rgba(25, 118, 210, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(76, 175, 80, 0.1) 0%, transparent 50%),
                        url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E")
                    `,
                    zIndex: 0,
                }
            }}
        >
            {/* Left Side - Medical Professionals Illustration */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 1,
                    px: 4,
                    py: 8
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        maxWidth: 600,
                        height: 500,
                    }}
                >
                    {/* Background Circle */}
                    <Box
                        sx={{
                            position: 'absolute',
                            width: 500,
                            height: 500,
                            background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.08), rgba(76, 175, 80, 0.08))',
                            borderRadius: '50%',
                            zIndex: 0,
                        }}
                    />

                    {/* Medical Professionals Image */}
                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            maxWidth: 500,
                        }}
                    >
                        <img
                            src="/doctor.png"
                            alt="Medical Professionals"
                            style={{
                                width: '100%',
                                maxWidth: '500px',
                                height: 'auto',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))',
                            }}
                        />
                    </Box>

                    {/* Medical Cross Symbols in Background */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 60,
                            left: 60,
                            fontSize: '1.5rem',
                            color: '#20b2aa',
                            opacity: 0.4,
                            zIndex: 1,
                        }}
                    >
                        ✚
                    </Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 120,
                            right: 100,
                            fontSize: '1.5rem',
                            color: '#20b2aa',
                            opacity: 0.4,
                            zIndex: 1,
                        }}
                    >
                        ✚
                    </Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 100,
                            left: 100,
                            fontSize: '1.5rem',
                            color: '#20b2aa',
                            opacity: 0.4,
                            zIndex: 1,
                        }}
                    >
                        ✚
                    </Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 60,
                            right: 60,
                            fontSize: '1.5rem',
                            color: '#20b2aa',
                            opacity: 0.4,
                            zIndex: 1,
                        }}
                    >
                        ✚
                    </Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 200,
                            left: 30,
                            fontSize: '1.5rem',
                            color: '#20b2aa',
                            opacity: 0.3,
                            zIndex: 1,
                        }}
                    >
                        ✚
                    </Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 250,
                            right: 30,
                            fontSize: '1.5rem',
                            color: '#20b2aa',
                            opacity: 0.3,
                            zIndex: 1,
                        }}
                    >
                        ✚
                    </Box>
                </Box>
            </Box>

            {/* Right Side - Login Form */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 1,
                    px: 4,
                    py: 8
                }}
            >
                <Paper
                    elevation={8}
                    sx={{
                        width: '100%',
                        maxWidth: 400,
                        padding: 4,
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {/* Logo and Title */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <img
                                src="/logoWithName.png"
                                alt="MedCare Logo"
                                style={{
                                    height: '150px',
                                    maxWidth: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                        </Box>

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                color: '#333',
                                mb: 1
                            }}
                        >
                            Welcome Back
                        </Typography>
                    </Box>

                    <form onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="doctor@hospital.com"
                                variant="outlined"
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        '&:hover fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1976d2',
                                            borderWidth: 2,
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#666',
                                        '&.Mui-focused': {
                                            color: '#1976d2',
                                        },
                                    }
                                }}
                            />
                        </Box>

                        {/* Password Field */}
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                variant="outlined"
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        '&:hover fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1976d2',
                                            borderWidth: 2,
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#666',
                                        '&.Mui-focused': {
                                            color: '#1976d2',
                                        },
                                    }
                                }}
                            />
                        </Box>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        {/* Login Button */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #1565c0, #1976d2)',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Login
                        </Button>
                    </form>

                    {/* Footer */}
                    <Box sx={{ textAlign: 'center', mt: 4, pt: 3, borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}>
                        <Typography variant="caption" sx={{ color: '#666', fontSize: '0.8rem' }}>
                            Secure Healthcare Management System
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}

export default Login;

