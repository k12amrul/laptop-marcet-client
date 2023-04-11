import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/categories`)
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])
    return (
        <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 '>
            {
                categories?.map(category =>
                  
                    <Link key={category._id} to={`/categories/${category._id}`}>
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <img src={category.img}
                         alt="Shoes" />
                        <div className="card-body">
                            <h2 className="card-title">{category.name}</h2>
                            <h1> {category._id } </h1>
                            <p>  { category.types} </p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                     </Link>

                )
            }
            <h1>Categories{categories?.length}</h1>

        </div>
        </div>
    );
};

export default Categories;