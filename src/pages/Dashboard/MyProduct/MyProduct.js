import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';
import { AuthContext } from '../../../context/AuthProvider';

const MyProduct = () => {

    const { user } = useContext(AuthContext);
   
    const { data: products = [], refetch } = useQuery({
        queryKey: ['seller'],
        queryFn: async () => {
            const res = await   fetch(`${process.env.REACT_APP_API_URL}/products?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })

    const handleDelete = id => {
        fetch(`${process.env.REACT_APP_API_URL}/product/${id}`, {
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

    const handleAdvertised = id => {
        fetch(`${process.env.REACT_APP_API_URL}/allproducts/${id}`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('See in the homepage')
                    refetch()
                }
            })
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
                            products.map((product, i) =>
                                <tr>
                                    <th>{i + 1}</th>
                                    <td>{product.name}</td>
                                    <td>{product.resalePrice}</td>
                                    <td>
                                        {
                                            !product.advertised &&
                                            <button onClick={() => handleAdvertised(product._id)} className='btn btn-primary  text-white uppercase'>Advertise</button>
                                        }
                                    </td>
                                    <td><FaTimes onClick={() => handleDelete(product._id)} /></td>
                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>
            
        </div>
    );
};

export default MyProduct;