import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7', // Roxo personalizado
    },
    secondary: {
      main: '#ff4081', // Rosa vibrante
    },
    background: {
      default: '#f5f5f5', // Fundo claro
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700, // Títulos mais destacados
    },
  },
});

export default theme;
