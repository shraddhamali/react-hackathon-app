import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Logout, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Navbar({ showBackButton, onBackClick, title }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                color: 'white'
            }}
        >
            <Toolbar>
                {/* Back Button */}
                {showBackButton && (
                    <Button
                        color="inherit"
                        startIcon={<ArrowBack />}
                        onClick={onBackClick}
                        sx={{
                            mr: 2,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                    >
                        Back to Table
                    </Button>
                )}

                {/* Spacer to push logout to the right */}
                <Box sx={{ flexGrow: 1 }} />

                <Button
                    color="inherit"
                    startIcon={<Logout />}
                    onClick={handleLogout}
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                    }}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
