import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import BookingModal from '../BookingModal/BookingModal';
import Products from '../Products/Products';

const Category = () => {
   const [ book ,setBook ] =useState([])
    const category =useLoaderData()
    return (
        <div>
               <div className='bg-neutral p-10 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    category.map(product => <Products
                        key={product._id}
                        product={product}
                        setBook={setBook}
                        // data={data}
                    >
                    </Products>)
                }

            </div>
            <div className='bg-neutral p-10 text-center'>
                <Link to='/'><button className="btn glass text-white">Go to Homepage</button></Link>
            </div>
            {
                <BookingModal
                    key={book.idx}
                    book={book}
                >

                </BookingModal>
            }


        </div>
    );
};

export default Category;