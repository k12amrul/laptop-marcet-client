

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

const useSeller = () => {
    const { user } = useContext(AuthContext);
    const [isSeller, setIsSeller] = useState(false);
    const [isSellerLoading, setIsSellerLoading] = useState(true);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/users?email=${user?.email}`)
            .then(res => res.json())

            .then(data => {
                if (data[0].role === "seller") {
                    setIsSeller(true)
                    setIsSellerLoading(false)
                }
            })
    }, [user?.email])
    return [isSeller, isSellerLoading];
}

export default useSeller;