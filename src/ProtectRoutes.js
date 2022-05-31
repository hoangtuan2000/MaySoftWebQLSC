import { Navigate, Outlet } from 'react-router-dom';

function ProtectRoutes() {

    if (localStorage.getItem('curentUserLogin') !== null) {
        return <Outlet />
    } else {
        return <Navigate to='/' />
    }
}

export default ProtectRoutes