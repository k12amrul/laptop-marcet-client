import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Login = () => {
    const { signIn,signInWithGoogle,updateUser ,setLoading } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
      const location = useLocation();
     const navigate = useNavigate();
     const [loginUserEmail, setLoginUser]=useState('')
   

     const from = location.state?.from?.pathname || '/';

     const handleLogin = data => {
        signIn(data.email, data.password)
            .then(result => {
                navigate(from, { replace: true });
                toast.success('Log In Successful')

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
        <div className='h-[800px]  bg-teal-300 flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="text"
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        <label className="label"> <span className="label-text">Forget Password?</span></label>
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <input className='btn btn-primary   text-white uppercase w-full mt-4' value="Login" type="submit" />
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                </form>
                <p>New to Laptop Marcet <Link className='text-secondary' to="/signup">Create new Account</Link></p>
                <div className="divider">OR</div>
                <button  onClick={handleSignInWithGoogle}  className='btn btn-primary   text-white uppercase w-full mt-4'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>

    );
};

export default Login;