import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const BookingModal = ({book}) => {

    const { register, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    const { name, originalPrice } = book;
    const navigate = useNavigate();

    const handleBookingSubmit = data => {
        const booking = {
            name: data.buyerName,
            email: data.buyerEmail,
            product: data.productName,
            price: data.price,
            phone: data.phone,
            meeting: data.meetingLocation
        }

        fetch(`${process.env.REACT_APP_API_URL}/bookings`,{
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    navigate('/myorders')
                    toast.success("Product is booked")
                }
            })
            .catch(error => toast.error(error.message))


        }
    return (
        <div>
        <input type="checkbox" id="bookingModal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box bg-red-400">
                <label htmlFor="bookingModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <div className='w-full p-7 font-semibold'>
                    <h1 className='text-5xl fon-bold text-center my-5 text-white font-bold'>Book Now!</h1>

                    <form onSubmit={handleSubmit(handleBookingSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">User Name</span>
                            </label>
                            <input type='name' defaultValue={user?.displayName} readOnly
                                {...register("buyerName", { required: true })}
                                className="input input-bordered w-full text-black" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-white">User Email</span>
                            </label>
                            <input type='email' defaultValue={user?.email} readOnly
                                {...register("buyerEmail", { required: true })}
                                className="input input-bordered w-full  text-black" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-white">Product</span>
                            </label>
                            <input type='text' defaultValue={name} readOnly
                                {...register("productName", { required: true })}
                                className="input input-bordered w-full  text-black" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-white">Product Price(tk.)</span>
                            </label>
                            <input type='text' defaultValue={originalPrice} readOnly
                                {...register("price", { required: true })}
                                className="input input-bordered w-full  text-black" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-white">Your Phone Number</span>
                            </label>
                            <input type='text' {...register("phone", { required: "Phone number is required" })}
                                placeholder="Your Phone Number" className="input input-bordered w-full  text-black" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-white">Meeting Location</span>
                            </label>
                            <input type='text' {...register("meetingLocation", { required: "Meeting location is required" })}
                                placeholder="Meeting Location" className="input input-bordered w-full  text-black" />
                        </div>

                        {
                            user?.email ?
                                <input className='btn btn-primary  text-white uppercase w-full mt-4'
                                    value='Book Now' type="submit" />
                                :
                                <Link to='/login' className='btn btn-primary w-full mt-4'>Login First</Link>
                        }

                    </form>
                </div>
            </div >
        </div>
    </div >

    );
};

export default BookingModal;