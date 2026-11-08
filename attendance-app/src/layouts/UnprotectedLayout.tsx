import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../hooks/useAuth'

function UnprotectedLayout() {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) return <Navigate to="/" />

    return (
        <Outlet />
    )
}

export default UnprotectedLayout