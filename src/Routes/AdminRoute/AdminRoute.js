import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../components/Loader";
import useAdmin from "../../hooks/useAdmin";



const AdminRoute = ({ children }) => {
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation();



    if (isAdminLoading) {
        return <Loader/>
    }

    if (isAdmin) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

export default AdminRoute;