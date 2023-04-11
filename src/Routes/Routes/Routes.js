import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Category from "../../pages/Categoriese/Category/Category";
import MyOrder from "../../pages/Categoriese/MyOrder/MyOrder";
import AddProduct from "../../pages/Dashboard/AddProduct/AddProduct";
import AllSellers from "../../pages/Dashboard/AllSellers/AllSellers";
import Blog from "../../pages/Dashboard/Blog/Blog";
import AllBuyers from "../../pages/Dashboard/Dashboard/AllBuyers/AllBuyers";
import Dashboard from "../../pages/Dashboard/Dashboard/Dashboard";
import ErrorPage from "../../pages/Dashboard/ErrorPage/ErrorPage";
import MyProduct from "../../pages/Dashboard/MyProduct/MyProduct";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";


export const router =createBrowserRouter([
    {
        path : '/',
        element : <Main/>,
        children :[
            {
                path: '/',
                element: <Home></Home>
            },
            
            {
                path : '/login',
                element:<Login/>

            },
            {
                path : '/signup',
                element: <Signup />

            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
           
            {
                path : '/categories/:id',
                loader : ({params} ) =>   fetch(`${process.env.REACT_APP_API_URL}/products/${params.id}`),
                element: <Category></Category>

            },
            {
                path : '/myorders',
                element:  <MyOrder></MyOrder> 

            },
           
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
            },
            {
                path: '/addproduct',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/myproducts',
                element: <SellerRoute><MyProduct></MyProduct></SellerRoute>
            },
            {
                path: '/allsellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path: '/allbuyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/*',
                element: <ErrorPage></ErrorPage>
            }

            
           
        ]

    }

])
 