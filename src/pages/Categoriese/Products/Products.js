import React from 'react';
import { Link } from 'react-router-dom';


const Products = ({ product, setBook }) => {
    const { img, name, location, resalePrice, originalPrice, yearsOfUse, sellerName, advertised }
     = product;

    return (
        <div>
           
               
            

            <div className="  ">
            <img className='w-full h-[450px] object-cover object-center rounded-lg shadow-md' src={img} alt={name} />


                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-baseline">
                        {advertised ?
                            <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                                advertised
                            </span>
                            :
                            <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                                not advertised
                            </span>

                        }
                    </div>

                    <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">{name}</h4>

                    <div className="mt-1">
                        <strong>Location: </strong>{location}
                    </div>
                    <div className="mt-1">
                        <strong>Original Price: </strong>{originalPrice}
                        <span className="text-gray-600 text-sm"> tk.</span>
                    </div>
                    <div className="mt-1">
                        <strong>Used: </strong>{yearsOfUse}
                        <span className="text-gray-600 text-sm"> years</span>
                    </div>
                    <div className="mt-1">
                        <strong>Seller Name: </strong>{sellerName}
                    </div>
                    <div className="mt-4">
                        <span className="text-teal-600 text-md font-semibold"> Resale Price:<strong> {resalePrice}</strong> tk.</span>
                    </div>

                    <div className="mt-2 flex justify-end">
                        <label htmlFor="bookingModal"
                            onClick={() => setBook(product)}
                            className="btn btn-primary ">Book Now</label>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default Products;