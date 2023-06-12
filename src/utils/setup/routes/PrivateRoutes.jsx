import { ROUTES } from '../../helper/routes'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import useAuthStore from '../useAuthStore'

const PrivateRoutes = ({ allowedRoles }) => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    const location = useLocation();
    const token = Cookies.get('token');

    // console.log(allowedRoles, user.role);
    useEffect(() => {
        const isValid = allowedRoles?.includes(user?.role);

        // if (user && !isValid) {
        //     return navigate(ROUTES.DASHBOARD);
        // }

        if (token === 'undefined') {
            setUser(null);
            Cookies.remove('token');
            return localStorage.removeItem('user');
        }

        if (!token && user) {
            setUser(null);
            return localStorage.removeItem('user');
        }

        if (!user || !token) {
            navigate(ROUTES.LOGIN, {
                state: {
                    from: location.pathname,
                },
                replace: true,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, user, token]);

    return <Outlet />;
};

export default PrivateRoutes;
