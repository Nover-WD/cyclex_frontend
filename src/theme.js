import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: '#0677d3',
            light: "#ffffff",
            dark: '#054e89'
        },
        secondary: {
            main: '#343439',
            light: '#ffffff',
            dark: '#555'
        }
    },
    typography: {
        h1: {
            fontFamily: 'Kaisei HarunoUmi',
            fontWeight: 700,
            fontSize: "48px",
            '@media (max-width:600px)': {
                fontSize: "46px"
            }
        },
        h2: {
            fontFamily: 'Kaisei HarunoUmi',
            fontWeight: 700,
            fontSize: "40px",
            '@media (max-width:600px)': {
                fontSize: "38px"
            }
        },
        h3: {
            fontFamily: 'Kaisei HarunoUmi',
            fontWeight: 700,
            fontSize: "32px",
            '@media (max-width:600px)': {
                fontSize: "30px"
            }
        },
        h4: {
            fontFamily: 'Kaisei HarunoUmi',
            fontWeight: 700,
            fontSize: "24px",
            '@media (max-width:600px)': {
                fontSize: "22px"
            }
        },
        h5: {
            fontFamily: 'Kaisei HarunoUmi',
            fontWeight: 700,
            fontSize: "18px",
            '@media (max-width:600px)': {
                fontSize: "16px"
            }
        },
        h6: {
            fontFamily: 'Kaisei HarunoUmi',
            fontWeight: 700,
            fontSize: "16px",
            '@media (max-width:600px)': {
                fontSize: "14px"
            }
        },
        body1: {
            fontFamily: 'Kaisei HarunoUmi',
            fontWeight: 400,
            fontSize: "18px",
            '@media (max-width:600px)': {
                fontSize: "16px"
            }
        },
        button: {
            fontFamily: 'Kaisei HarunoUmi',
            fontWeight: 700,
            fontSize: "18px",
            '@media (max-width:600px)': {
                fontSize: "16px"
            }
        }
    }
});

export default theme;


