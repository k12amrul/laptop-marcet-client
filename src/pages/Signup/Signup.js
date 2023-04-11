import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { json, Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { createUser,signInWithGoogle, user,setLoading,updateUser } = useContext(AuthContext)
    const [createdUserEmail, setCreatedUserEmail ] = useState('')
   
   const navigate =useNavigate()

   
    const handleSignUp = data => {
        console.log( data)
        createUser(data.email, data.password)
            .then(result => {
                toast.success('Account created successfully')
                const profile = {
                    displayName: data.name,
                    role: data.role,
                    verified: false
                }

                updateUser(profile)
                    .then(result => {
                        console.log( result)
                        const userInfo = {
                            displayName: data.name,
                            role: data.role,
                            verified: false,
                            email: data.email
                        }
                        addUsers(userInfo)
                    })
                    .catch(error => toast.error(error.message.split('/')[1].split(')')))
            })
            .catch(error => toast.error(error.message.split('/')[1].split(')')))
    }

    const handleSignInWithGoogle = () => {
        signInWithGoogle()
            .then(result => {
                toast.success('Account created successfully')
                const profile = {
                    role: 'buyer',
                    verified: false
                }
                updateUser(profile)
                    .then(result => {
                        const user = result.user;
                        console.log( user )
                        const userInfo = {
                            displayName: user?.displayName,
                            role: "buyer",
                            verified: false,
                            email: user.email
                        }
                            console.log(userInfo )
                        addUsers(userInfo)
                    })
                    .catch(error => toast.error(error.message.split('/')[1].split(')')))
            })
            .catch(error => toast.error(error.message.split('/')[1].split(')')))
    }

    const addUsers = profile => {
        fetch(`${process.env.REACT_APP_API_URL}/users`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setLoading(false)
                    toast.success('User added successfully')
                    navigate('/')
                }
            })
            .catch(error => toast.error(error.message))
    }

    return (
        <div className='h-[800px] bg-teal-300 flex justify-center items-center'>
        <div className='w-96 p-7'>
            <h2 className='text-xl text-center'>Signup</h2>
            <form onSubmit={handleSubmit(handleSignUp)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-white">Name</span>
                            </label>
                            
                            <input type='name' {...register("name", { required: "Name is required" })}
                                placeholder="Name" className="input input-bordered w-full max-w-xs text-black" />
                            {errors.name && <p className='text-red-900'>{errors.name?.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-white">Email</span>
                            </label>
                            <input type='email' {...register("email", {
                                required: "Email Address is required",
                                pattern: { value: /^[a-z]/, message: "Email must be in lowercase" }
                            })}
                                placeholder="Email" className="input input-bordered w-full max-w-xs text-black" />
                            {errors.email && <p className='text-red-900'>{errors.email?.message}</p>}
                        </div>

                        <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password"
                            {...register('password', {
                                required: 'Password is required ',
                                minLength: { value: 6, message: "Password must be 6 characters or longer" }
                            })}
                         
                            className="input input-bordered w-full max-w-xs" />
                        <label className="label"> <span className="label-text">Forget Password?</span></label>
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-white">Join as</span><br />
                            </label>
                            <select
                                {...register("role", { required: true })}
                                className="input input-bordered w-full max-w-xs text-black">
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>
                        <input className='btn btn-primary   text-white uppercase w-full mt-4' value='Sign Up' type="submit" />

                    </form>
            <p>Already have an account <Link className='text-secondary' to="/login">Please Login</Link></p>
            <div className="divider">OR</div>
            <button onClick={handleSignInWithGoogle}className='btn btn-primary   text-white uppercase w-full mt-4'>CONTINUE WITH GOOGLE</button>
        </div>
    </div>

    );
};

export default SignUp;