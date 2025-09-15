import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1E88E5',
            dark: '#1565C0',
            light: '#42A5F5',
            100: '#E3F2FD',
        },
        secondary: {
            main: '#7C3AED',
            light: '#A78BFA',
            100: '#EDE9FE',
        },
        success: {
            main: '#22C55E',
            light: '#4ADE80',
            100: '#DCFCE7',
        },
        warning: {
            main: '#F59E0B',
            light: '#FBBF24',
            100: '#FEF3C7',
        },
        error: {
            main: '#EF4444',
            light: '#F87171',
            100: '#FEE2E2',
        },
        background: {
            default: '#F1F5FE',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#0F172A',
            secondary: '#475569',
        },
        divider: '#E5E7EB',
    },
    typography: {
        fontFamily: [
            'Poppins',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontFamily: 'Poppins',
            fontWeight: 700,
            letterSpacing: '-0.025em',
        },
        h2: {
            fontFamily: 'Poppins',
            fontWeight: 700,
            letterSpacing: '-0.025em',
        },
        h3: {
            fontFamily: 'Poppins',
            fontWeight: 600,
            letterSpacing: '-0.025em',
        },
        h4: {
            fontFamily: 'Poppins',
            fontWeight: 600,
            letterSpacing: '-0.025em',
        },
        h5: {
            fontFamily: 'Poppins',
            fontWeight: 700,
            letterSpacing: '-0.025em',
        },
        h6: {
            fontFamily: 'Poppins',
            fontWeight: 700,
            letterSpacing: '-0.025em',
        },
        subtitle1: {
            fontFamily: 'Poppins',
            fontWeight: 500,
        },
        subtitle2: {
            fontFamily: 'Poppins',
            fontWeight: 500,
        },
        body1: {
            fontFamily: 'Poppins',
            fontWeight: 400,
        },
        body2: {
            fontFamily: 'Poppins',
            fontWeight: 400,
        },
        button: {
            fontFamily: 'Poppins',
            fontWeight: 500,
        },
        caption: {
            fontFamily: 'Poppins',
            fontWeight: 400,
        },
        overline: {
            fontFamily: 'Poppins',
            fontWeight: 500,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: 'Poppins',
                    background: 'radial-gradient(ellipse at top, #EFF6FF 0%, #F1F5FE 100%)',
                    minHeight: '100vh',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    boxShadow: '0 10px 24px rgba(2, 6, 23, 0.06)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    fontWeight: 500,
                    textTransform: 'none',
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    margin: '4px 8px',
                    minHeight: 48,
                    '&.Mui-selected': {
                        backgroundColor: '#E3F2FD',
                        color: '#1565C0',
                        fontWeight: 700,
                        transform: 'translateX(4px)',
                        boxShadow: '0 2px 8px rgba(21, 101, 192, 0.2)',
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        transform: 'translateX(2px)',
                    },
                    transition: 'all 0.3s ease-in-out',
                },
            },
        },
    },
});

export default theme;
