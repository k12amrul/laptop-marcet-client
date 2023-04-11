import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';
import Loader from '../../../components/Loader';
import Verified from '../../../components/Verified';
import { AuthContext } from '../../../context/AuthProvider';

const AllSellers = () => {
    const { user } = useContext(AuthContext)

    const { data: sellers = [], isLoading, refetch } = useQuery({
        queryKey: ['seller'],
        queryFn: async () => {
            const res = await  fetch(`${process.env.REACT_APP_API_URL}/users/seller`)
            const data = await res.json()
            return data
        }
    })

    const handleDelete = id => {
        fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success("User deleted successfully")
                    refetch();
                }
            })
            .catch(error => toast.error(error.message))
    }

    const handleVerify = id => {
        fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success(`${user?.displayName} is now verified`)
                    refetch();
                }
            })
    }
    if (isLoading) {
        return <Loader/>
    }


    return (
        <div>
                    <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Verified</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            sellers.map((seller, i) =>
                                <tr key={seller._id}>
                                    <th>{i + 1}</th>
                                    <td>{seller.displayName}
                                        <p>{seller?.verified &&
                                            <Verified></Verified>
                                        }</p></td>
                                    <td>{seller.email}</td>
                                    <td>
                                        {
                                            !seller?.verified &&
                                            <button onClick={() => handleVerify(seller._id)} className='btn btn-primary  text-white uppercase'>Verify</button>
                                        }
                                    </td>
                                    <td><FaTimes onClick={() => handleDelete(seller._id)} /></td>
                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default AllSellers;