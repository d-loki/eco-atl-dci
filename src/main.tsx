import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import {ThemeProvider} from '@/components/theme-provider.tsx';
import {Toaster} from '@/components/ui/sonner.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <App />
            <Toaster />
        </ThemeProvider>
    </React.StrictMode>,
);
