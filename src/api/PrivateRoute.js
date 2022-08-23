import { useLocation } from 'react-router-dom';
import { CheckToken } from '../token/CheckToken';

function PrivateRoute() {
    const location = useLocation();
    const { isAuth } = CheckToken(location.key);
    console.log('route');
    
    if (isAuth === 'Failed') {
        return document.location.href = 'http://localhost:3000/Members';
    } 

    /*return <Outlet />*/
}
export default PrivateRoute;