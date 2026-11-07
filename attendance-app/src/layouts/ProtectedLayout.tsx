import { Navigate, Outlet } from 'react-router'
import { getToken } from '../utils';

function ProtectedLayout() {
    const token = getToken()
    
    if (!token) return <Navigate to="/login" />

    return <Outlet />
}

export default ProtectedLayout