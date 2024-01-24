import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { ThemeProvider } from '@/components/theme-provider.tsx';
import { Toaster } from '@/components/ui/sonner.tsx';
import Root from '@/routes/root.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '@/pages/error.tsx';
import QuotationPage from '@/pages/quotation';
import DashboardPage from '@/pages/dashboard';
import CustomerPage from '@/pages/customer';
import ParameterPage from '@/pages/parameter';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <DashboardPage />,
            },
            {
                path: 'devis',
                element: <QuotationPage />,
            },
            {
                path: 'clients',
                element: <CustomerPage />,
            },
            {
                path: 'parametres',
                element: <ParameterPage />,
            },
        ],
    },
]);
// Rendu de l'application
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
            <Toaster />
        </ThemeProvider>
    </React.StrictMode>
);
