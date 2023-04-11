import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import { FaTimes } from "react-icons/fa";
const MyOrder = () => {
  
    
    const { user } = useContext(AuthContext)
    const { data: orders = [], refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await    fetch(`${process.env.REACT_APP_API_URL}/bookings?email=${user?.email}`)
            const data = res.json()
            // console.log( data)

            return data
        }
    })
    refetch()

    const handleOrderDelete = id => {
        fetch(`${process.env.REACT_APP_API_URL}/bookings/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success("Product deleted successfully")
                    refetch()
                }
            })
            .catch(error => toast.error(error.message))
    }

    return (
        <div>
                    <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            orders.map((order, i) =>
            


                                <tr key={order._id}>
                                    <th>{i + 1}</th>
                                    <td>{order.product}</td>
                                    <td>{order.price}</td>
                                    <td><Link to={`/myorders/payment/${order._id}`}><button className='btn btn-primary  text-white uppercase'>Pay</button></Link></td>
                                    <td><FaTimes onClick={() => handleOrderDelete(order._id)} /></td>
                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};


export default MyOrder;