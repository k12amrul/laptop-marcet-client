import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`https://ass-12-server-xi.vercel.app/users?email=${user?.email}`)
        .then(res => res.json())
            .then(data => setData(data))
    }, [user?.email])


    const handleLogOut = () => {
        logout()
        .then(result => {
            toast.success('Logged Out Successfully')
        })
        .catch(error => toast.error(error.message))

    }
    const menuItems = <>
    <li><Link to='/'>Home</Link></li>
    <li><Link to='/blog'>Blog</Link></li>
    <li><Link to='/contact'>Contact</Link></li>
    {user?.uid ?
            <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><button onClick={handleLogOut}>Sign out</button></li>
           
            </>
            : 
            <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
           
            </>
           }
    {
        user?.email && data[0]?.role === "admin" ?
            <div className="dropdown dropdown-hover">
                <li><Link tabIndex={0} to='/dashboard'>Dashboard</Link></li>
                <ul tabIndex={0} className="menu menu-compact lg:dropdown-content menu p-2 shadow rounded-box w-52  bg-rose-300">
                    <li><Link to='/allsellers'>All Sellers</Link></li>
                    <li><Link to='/allbuyers'>All Buyers</Link></li>
                </ul>
            </div>

            :
            user?.email && data[0]?.role === "seller" ?
                <div className="dropdown dropdown-hover">
                    <li><Link tabIndex={0} to='/dashboard'>Dashboard</Link></li>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-52  bg-rose-300">
                        <li><Link to='/addproduct'>Add Product</Link></li>
                        <li><Link to='/myproducts'>My Products</Link></li>
                    </ul>
                </div>
                :
                user?.email && data[0]?.role === "buyer" ?
                    <div className="dropdown dropdown-hover">
                        <li><Link tabIndex={0} to='/dashboard'>Dashboard</Link></li>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-52 bg-rose-300">
                            <li><Link to='/myorders'>My Orders</Link></li>
                        </ul>
                    </div>

                    :
                    <li><Link to='/dashboard'>Dashboard</Link></li>
    }

    {
        user?.displayName &&
        <p className='m-3'>{user?.displayName}</p>

    }

    {
        user?.photoURL ?
            <img src={user?.photoURL} className='w-10 rounded-full' alt="" />
            :
            <img src={"no Photo"} className='w-10 rounded-full' alt="" />
    }
</>
    
    return (
        <div className="navbar bg-base-100 flex justify-between">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-green-200 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl">Laptop Marcet</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <label htmlFor="my-drawer-2" tabIndex={2} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
        </div>
    );
};

export default Navbar;