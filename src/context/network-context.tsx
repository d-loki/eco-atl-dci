import { createContext, FC, ReactNode, useEffect, useState } from 'react';

type NetworkContextType = {
    isOnline: boolean;
};

const NetworkContext = createContext<NetworkContextType>({
    isOnline: true,
});

export default NetworkContext;

const NetworkProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        // Update network status
        const handleStatusChange = () => {
            setIsOnline(navigator.onLine);
        };

        // Listen to the online status
        window.addEventListener('online', handleStatusChange);

        // Listen to the offline status
        window.addEventListener('offline', handleStatusChange);

        // Specify how to clean up after this effect for performance improvment
        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        };
    }, [isOnline]);

    return (
        <NetworkContext.Provider
            value={{
                isOnline,
            }}
        >
            {children}
        </NetworkContext.Provider>
    );
};

export { NetworkProvider };
