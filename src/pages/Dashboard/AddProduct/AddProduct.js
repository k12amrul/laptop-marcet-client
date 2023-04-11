import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider';

const AddProduct = () => {

    const { register, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);

    const handleAddProduct = data => {
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`;
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const product = {
                        img: imgData.data.url,
                        name: data.productName,
                        location: data.location,
                        resalePrice: data.price,
                        originalPrice: data.originalPrice,
                        categories_ID: data.category,
                        yearsOfUse: data.yearsOfUse,
                        sellerName: data.sellerName,
                        email: data.sellerEmail,
                        verified: data.verify,
                        advertised: false,
                        paid: false,
                        reported: false
                        
                    }

                    fetch(`${process.env.REACT_APP_API_URL}/products`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            toast.success(`${user.displayName} is added successfully`);
                            fetch(`${process.env.REACT_APP_API_URL}/products/${product._id}`, {
                                method: "PUT"
                            })
                                .then(res => res.json())
                                .then(data => {
                                })
                        })
                }
            })
    }

    return (
        <div>
            
            <div className='h-[1200px] flex justify-center items-center bg-gray-400 text-white'>
                <div className='w-96 p-7'>
                    <h1 className='text-5xl fon-bold text-center my-5'>Add a Product</h1>

                    <form onSubmit={handleSubmit(handleAddProduct)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-white">Name</span>
                            </label>
                            <input type='name' {...register("productName", { required: "Name is required" })}
                                placeholder="Product Name" className="input input-bordered w-full max-w-xs text-black" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-white">Email</span>
                            </label>
                            <input type='email' {...register("sellerEmail", { required: true })}
                                placeholder="Email" defaultValue={user?.email} readOnly className="input input-bordered w-full max-w-xs text-black" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-white">Price</span>
                            </label>
                            <input type='text' {...register("price", { required: "Price is required" })}
                                placeholder="Price" className="input input-bordered w-full max-w-xs text-black" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-white">Category</span><br />
                            </label>
                            <select
                                {...register("category", { required: true })}
                                className="input input-bordered w-full max-w-xs text-black">
                                <option value="637fe04ce80b236a92d5387c"> Hp </option>
                                <option value="637fe04ce80b236a92d5387d">Asus </option>
                                <option value="637fe04ce80b236a92d5387e"> Deel </option>
                            </select>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-white">Mobile Number</span>
                            </label>
                            <input type='text' {...register("number", { required: "Mobile Number is required" })}
                                placeholder="Mobile Number" className="input input-bordered w-full max-w-xs text-black" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-white">Location</span>
                            </label>
                            <input type='text' {...register("location", { required: "Location is required" })}
                                placeholder="Location" className="input input-bordered w-full max-w-xs text-black" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-white">Original Price</span>
                            </label>
                            <input type='text' {...register("originalPrice", { required: "Original price is required" })}
                                placeholder="Original Price" className="input input-bordered w-full max-w-xs text-black" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-white">Used for</span>
                            </label>
                            <input type='text' {...register("yearsOfUse", { required: "Year of use is required" })}
                                placeholder="Used for" className="input input-bordered w-full max-w-xs text-black" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-white">Seller Name
                                </span>
                            </label>
                            <input type='text' {...register("sellerName", { required: "Seller name is required" })}
                                placeholder="Seller Name" defaultValue={user?.displayName}
                                readOnly className="input input-bordered w-full max-w-xs text-black" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-white">Photo</span>
                            </label>
                            <input type='file' {...register("img", { required: "Image is required" })}
                                placeholder="Photo" className="file-input file-input-border text-white w-full max-w-xs text-black" />
                        </div>


                        <input className='btn btn-primary  text-white uppercase w-full mt-4' value='Add a Product' type="submit" />

                    </form>
                </div>
            </div >
            
        </div>
    );
};

export default AddProduct;