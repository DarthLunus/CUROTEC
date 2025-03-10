import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import App from './App';
import store from './Redux/store';
import theme from './theme';
import background from './assets/dnd/wallpaper.jpg';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            fontFamily: '"Roboto", sans-serif',
          },
        }}
      />
      <App />
    </ThemeProvider>
  </Provider>
);
