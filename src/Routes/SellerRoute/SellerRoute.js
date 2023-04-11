import { Navigate, useLocation } from "react-router-dom";
import useSeller from "../../hooks/useSeller";



const SellerRoute = ({ children }) => {
    const [isSeller, isSellerLoading] = useSeller();
    const location = useLocation();
    if (isSellerLoading) {
        return <h1>loading</h1>
    }

    if ((isSeller)) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

export default SellerRoute;