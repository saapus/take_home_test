import React from 'react';
import { ThemeProvider } from '../contexts/theme';

export default function App({ children }) {
  return (<>
    <ThemeProvider>
      { children }
    </ThemeProvider>
  </>);
}
