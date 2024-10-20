import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import {routes} from "@/helpers/routes.tsx";
import {useEffect} from "react";
import {setConfig} from "@/helpers/token.tsx";
import {consoleClear, siteSecurity} from "@/helpers/functions/toastMessage.tsx";

function App() {
    const navigate = useNavigate();
    const {pathname} = useLocation()
    const tokens = sessionStorage.getItem('token');
    const admin_role = sessionStorage.getItem('admin_roles');

    useEffect(() => {
        setConfig()
        siteSecurity()
        window.scrollTo(0, 0);
        const refresh = sessionStorage.getItem('refreshes');

        if (!tokens) {
            sessionStorage.removeItem('refreshes');
            if (!pathname.startsWith('/auth')) navigate('/auth/login');
        } else if (!refresh) sessionStorage.setItem('refreshes', 'true');

        if (pathname === '/') {
            if (!tokens || !admin_role) navigate('/auth/login');
            else if (tokens && admin_role === 'ROLE_ADMIN') navigate('/super-admin/dashboard')
            else if (tokens && admin_role === 'ROLE_MASTER') navigate('/user/report')
            else if (tokens && admin_role === 'ROLE_THOKIM') navigate('/t-hokim/dashboard')
            else if (tokens && admin_role === 'ROLE_VHOKIM') navigate('/v-hokim/dashboard')
            else if (tokens && admin_role === 'ROLE_SECTOR') navigate('/sector/dashboard')
        }

        if (!tokens && !pathname.startsWith('/auth')) navigate('/auth/login');
        if (!tokens && pathname.startsWith('/auth')) sessionStorage.removeItem('refreshes');

        setTimeout(() => {
            consoleClear()
        }, 10000)
    }, [tokens, pathname, navigate]);

    return (
        <DefaultLayout>
            <Routes>
                {routes.map(route => (
                    <Route
                        key={route.path}
                        index={route.path === '/auth/login'}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Routes>
        </DefaultLayout>
    )
}

export default App
