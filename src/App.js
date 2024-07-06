import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {RouterProvider,createBrowserRouter} from "react-router-dom"
import MainLayout from './Layouts/MainLayout'
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import WishList from './components/WishList/WishList'
import AuthenLay from './Layouts/AuthenLay'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import NotFound from './components/NotFound/NotFound'
import { Offline, Online } from "react-detect-offline";
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import CartContextProvider from './components/Context/CartContext'
import WishListContextProvider from './components/Context/WishListContext'
import { ToastContainer } from 'react-toastify';
import Address from './components/Address/Address'




export default function App() {
  let routes = createBrowserRouter([
    {path:'/' , element:<MainLayout/> ,  children:[
      {index:true , element:<ProtectedRoutes><Home/></ProtectedRoutes>},
      {path:'home' , element:<ProtectedRoutes><Home/></ProtectedRoutes>},
      {path:'categories' , element:<ProtectedRoutes><Categories/></ProtectedRoutes>},
      {path:'products' , element:<ProtectedRoutes><Products/></ProtectedRoutes>},
      {path:'brands' , element:<ProtectedRoutes><Brands/></ProtectedRoutes>},
      {path:'cart' , element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
      {path:'wishlist' , element:<ProtectedRoutes><WishList/></ProtectedRoutes>},
      {path:'address/:id' , element:<ProtectedRoutes><Address/></ProtectedRoutes>},

      {path:'*' , element:<NotFound/>}



    ]},
    {path:'/' , element:<AuthenLay/> , children:[

      
      {path:'sign' , element:<SignIn/>},
      {path:'Signup' , element:<SignUp/>}


    ]}
  ])
  return (
    <>
   
    <CartContextProvider>
    <WishListContextProvider>
    <RouterProvider router={routes}/>
    </WishListContextProvider>
    </CartContextProvider>
    
    <ToastContainer  autoClose={700}/>

    <Offline>
      <div className="offline">You are Offline Now !!</div>
    </Offline>
    
    </>
  )
}
