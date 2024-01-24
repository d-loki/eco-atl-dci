import { Outlet } from 'react-router-dom';
import Header from '@/components/navigation/header.tsx';

export default function Root() {
    return (
        <>
            <Header />
            <div className="container my-5 max-w-screen-2xl">
                <Outlet />
            </div>
        </>
    );
}
