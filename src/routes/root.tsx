import {Outlet} from 'react-router-dom';
import Header from '@/components/navigation/header.tsx';

export default function Root() {
    return (
        <>
            <Header />
            <div className="container max-w-screen-2xl my-5">
                <Outlet />
            </div>
        </>
    );
}
