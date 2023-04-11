import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';
import Loader from '../../../../components/Loader';
import { AuthContext } from '../../../../context/AuthProvider';

const AllBuyers = () => {

    const { user } = useContext(AuthContext)

    const { data: Buyers = [], isLoading, refetch } = useQuery({
        queryKey: ['buyer'],
        queryFn: async () => {
            const res = await  fetch(`${process.env.REACT_APP_API_URL}/users/buyer`)
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

    if (isLoading) {
        return <Loader></Loader>
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            Buyers.map((buyer, i) =>
                                <tr key={buyer._id}>
                                    <th>{i + 1}</th>
                                    <td>{buyer.displayName}</td>
                                    <td>{buyer.email}</td>
                                    <td><FaTimes onClick={() => handleDelete(buyer._id)} /></td>
                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>
            
        </div>
    );
};

export default AllBuyers;