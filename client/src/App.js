import React from 'react'
import { AppRouter } from './Route'
import { useRoutes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from './theme';
import 'simplebar-react/dist/simplebar.min.css';

const App = () => {
    const element = useRoutes(AppRouter)
    const theme = createTheme({
        colorPreset: 'blue',
        contrast: 'high'
      });
    
      
    return (
        <ThemeProvider theme={theme}>
         <CssBaseline />
         {element}
        </ThemeProvider>)
}

export default App
