import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Alert,
    Container,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import {
    Assessment,
    Timeline,
    Analytics,
    MedicalServices,
    TrendingUp,
    Description
} from '@mui/icons-material';

// FeatureCard Component
const FeatureCard = ({ icon, title, description }) => {
    return (
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'flex-start' }}>
            <Box sx={{ mr: 3, p: 2, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                {icon}
            </Box>
            <Box>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    {description}
                </Typography>
            </Box>
        </Box>
    );
};

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
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

        const isValid = email.trim().length > 0 && password.trim().length > 0 && termsAccepted;
        if (!isValid) {
            if (!termsAccepted) {
                setError('Please accept the terms and conditions.');
                return;
            }
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
                background: 'linear-gradient(135deg, #1a4fa0 0%, #2563eb 50%, #3b82f6 100%)',
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
                        radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
                        url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")
                    `,
                    zIndex: 0,
                }
            }}
        >
            {/* Left Side - Feature Highlights */}
            <Box
                sx={{
                    flex: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 1,
                    px: 6,
                    py: 8
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 600,
                    }}
                >
                    {/* Platform Title */}
                    <Typography
                        variant="h3"
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            mb: 2,
                            textAlign: 'left'
                        }}
                    >
                        Medi-Synapse Platform
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            color: 'rgba(255,255,255,0.9)',
                            mb: 6,
                            textAlign: 'left'
                        }}
                    >
                        Advanced Medical Analytics & Patient Management
                    </Typography>

                    {/* Feature Cards */}
                    <FeatureCard
                        icon={<Assessment sx={{ color: 'white', fontSize: '2rem' }} />}
                        title="Instant Reports"
                        description="Generate comprehensive medical reports from patient charts instantly with AI-powered analysis and diagnostic recommendations."
                    />

                    <FeatureCard
                        icon={<Timeline sx={{ color: 'white', fontSize: '2rem' }} />}
                        title="Patient Timeline & Risk Analysis"
                        description="Access complete patient medical history with interactive timeline, risk assessments, and predictive health insights."
                    />

                    <FeatureCard
                        icon={<Analytics sx={{ color: 'white', fontSize: '2rem' }} />}
                        title="Health Analytics & Insights"
                        description="Advanced health analytics with AI-driven insights, trend analysis, and personalized treatment recommendations."
                    />
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
                        maxWidth: 500,
                        padding: 5,
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
                                src="/medi-synapse-logo-white-bg.png"
                                alt="Medi-Synapse Logo"
                                style={{
                                    height: '120px',
                                    maxWidth: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                        </Box>

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                color: '#1f2937',
                                mb: 1
                            }}
                        >
                            Sign in to Medi-Synapse Platform
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                color: '#6b7280',
                                mb: 2
                            }}
                        >
                            Access your medical dashboard and patient insights
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
                                            borderColor: '#2563eb',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#2563eb',
                                            borderWidth: 2,
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#6b7280',
                                        '&.Mui-focused': {
                                            color: '#2563eb',
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
                                            borderColor: '#2563eb',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#2563eb',
                                            borderWidth: 2,
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#6b7280',
                                        '&.Mui-focused': {
                                            color: '#2563eb',
                                        },
                                    }
                                }}
                            />
                        </Box>

                        {/* Terms and Conditions */}
                        <Box sx={{ mb: 3 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                        sx={{
                                            color: '#2563eb',
                                            '&.Mui-checked': {
                                                color: '#2563eb',
                                            },
                                        }}
                                    />
                                }
                                label={
                                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                        I agree with{' '}
                                        <span style={{ color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}>
                                            Terms and Conditions
                                        </span>{' '}
                                        and{' '}
                                        <span style={{ color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}>
                                            Privacy Policies
                                        </span>{' '}
                                        of service.
                                    </Typography>
                                }
                            />
                        </Box>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        {/* Sign In Button */}
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
                                background: 'linear-gradient(135deg, #1a4fa0, #2563eb)',
                                textTransform: 'none',
                                letterSpacing: '0.5px',
                                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #1e40af, #1a4fa0)',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 6px 16px rgba(37, 99, 235, 0.4)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Sign In
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

