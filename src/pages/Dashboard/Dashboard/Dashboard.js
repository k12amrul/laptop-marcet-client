import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import BookingModal from '../../Categoriese/BookingModal/BookingModal';
import Products from '../../Categoriese/Products/Products';

const Dashboard = () => {

    const { user } = useContext(AuthContext);
    const [book, setBook] = useState([]);
    const [count, setCount] = useState(0);
    const [category, setCategory] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(9);


    useEffect(() => {
       
        // fetch(`https://ass-12-server-xi.vercel.app/dashboardProducts?page=${page}&size=${size}`)
        fetch(`${process.env.REACT_APP_API_URL}/dashboardProducts?page=${page}&size=${size}`)
        .then(res => res.json())
         
            .then(data => {
                setCount(data.count)
                setCategory(data.products)
            })
    }, [page, size])
    const pages = Math.ceil(count / size);


    return (
        <div>
                     <div className='bg-neutral p-10 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    category?.map(product => <Products
                        key={product._id}
                        product={product}
                        setBook={setBook}
                    >
                    </Products>)
                }


            </div>

            <div className='bg-neutral p-10 text-center'>
                <div className="btn-group text-center">
                    {
                        [...Array(pages).keys()].map(number => <button
                            key={number}
                            className={page === number ? 'btn btn-xs btn-active' : 'btn btn-xs'}
                            onClick={() => setPage(number)}
                        >
                            {number + 1}
                        </button>)
                    }
                </div>
            </div>
            {
                <BookingModal
                    book={book}
                >

                </BookingModal>
            }

        </div>
    );
};

export default Dashboard;