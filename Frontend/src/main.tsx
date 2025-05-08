/**
 * Entry point of the UniAdvise React application.
 *
 * @remarks
 * This file sets up the root rendering logic with key providers:
 * - `StrictMode` helps identify potential issues in development.
 * - `ChakraProvider` provides a custom UI theme (`system`).
 * - `AuthProvider` manages global authentication state.
 * - `BrowserRouter` enables routing throughout the app.
 *
 * @module main
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { App } from './App.tsx';
import { system } from './theme.ts';
import { AuthProvider } from './context/AuthContext';

// Create and render the React root
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>
);
