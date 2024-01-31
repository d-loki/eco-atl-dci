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
import EditQuotationPage from '@/pages/quotation/edit';
import { NetworkProvider } from '@/context/network-context.tsx';

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
                path: 'devis/:reference',
                element: <EditQuotationPage />,
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
            <NetworkProvider>
                <RouterProvider router={router} />
                <Toaster position="bottom-right" richColors={true} />
            </NetworkProvider>
        </ThemeProvider>
    </React.StrictMode>
);
