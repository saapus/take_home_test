import React from 'react';
import { ThemeProvider } from '../contexts/theme';
import { Provider } from "react-redux";
import taxesStore from "../stores/taxes";

export default function App({ children }) {
  return (
    <>
      <ThemeProvider>
        <Provider store={taxesStore}>{children}</Provider>
      </ThemeProvider>
    </>
  );
}
