import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Logout, ArrowBack, Notifications, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SearchBar from './ui/SearchBar';

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
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 2px 16px rgba(0, 0, 0, 0.08)',
                color: '#0F172A',
                borderBottom: '1px solid rgba(229, 231, 235, 0.5)'
            }}
        >
            <Toolbar sx={{ px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* App Name with Logo */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                        src="/medi-synapse-logo-white-bg.png" 
                        alt="Medi-Synapse Logo"
                        style={{
                            height: '40px',
                            width: 'auto',
                            marginRight: '12px',
                            borderRadius: '8px'
                        }}
                    />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            color: '#1565C0',
                            fontWeight: 700,
                            fontSize: '1.5rem',
                            mr: 3,
                            letterSpacing: '0.5px'
                        }}
                    >
                        MEDI-SYNAPSE
                    </Typography>

                    {/* Back Button */}
                    {showBackButton && (
                        <Button
                            startIcon={<ArrowBack />}
                            onClick={onBackClick}
                            sx={{
                                mr: 3,
                                color: '#475569',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                borderRadius: 12,
                                px: 2,
                                py: 1,
                                '&:hover': {
                                    backgroundColor: '#E3F2FD',
                                    color: '#1565C0',
                                }
                            }}
                        >
                            Back to Table
                        </Button>
                    )}  

                </div>


                {/* Right Actions */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                        startIcon={<Logout />}
                        onClick={handleLogout}
                        sx={{
                            ml: 1,
                            color: '#475569',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: 12,
                            px: 2,
                            py: 1,
                            '&:hover': {
                                backgroundColor: '#FEE2E2',
                                color: '#EF4444',
                            }
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
