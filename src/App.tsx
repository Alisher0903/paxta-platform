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
            if (!tokens) navigate('/auth/login');
            else if (tokens && !admin_role) navigate('/admin/site-role');
            else if (tokens && admin_role === 'ADMIN_ONLINE') navigate('/online/dashboard');
            else if (tokens && admin_role === 'ADMIN_QUIZ') navigate('/quiz/dashboard');
            else if (tokens && admin_role === 'ADMIN_EDU') navigate('/edu/dashboard');
        }

        if (tokens && !admin_role) navigate('/admin/site-role');
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
