import { Outlet, Navigate } from 'react-router-dom'
import { getToken } from '../utils/session';
import { STATIC_ROUTES } from './static_routes';

const PrivateRoutes = () => {
    const token = getToken();
    return(
        token ==null ? <Outlet/> : <Navigate to={STATIC_ROUTES.AUTH.LOGIN}/>
    )
}

export default PrivateRoutes;