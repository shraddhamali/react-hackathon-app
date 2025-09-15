import { createTheme } from '@mui/material/styles';

const theme = createTheme({
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
            fontWeight: 600,
        },
        h2: {
            fontFamily: 'Poppins',
            fontWeight: 600,
        },
        h3: {
            fontFamily: 'Poppins',
            fontWeight: 600,
        },
        h4: {
            fontFamily: 'Poppins',
            fontWeight: 600,
        },
        h5: {
            fontFamily: 'Poppins',
            fontWeight: 600,
        },
        h6: {
            fontFamily: 'Poppins',
            fontWeight: 600,
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
                },
            },
        },
    },
});

export default theme;
