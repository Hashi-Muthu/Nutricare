import React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    success: {
      light: '#4caf50',
      main: '#4caf50',
      dark: '#4caf50',
    },
  },
});

function MyButton() {
  return (
    <ThemeProvider theme={theme}>
      <Button color="success">Success Button</Button>
    </ThemeProvider>
  );
}

export default MyButton;
