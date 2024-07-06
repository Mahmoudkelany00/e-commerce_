import React, { useContext, useEffect, useState } from 'react'

import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'
import { WishListContext } from '../Context/WishListContext'

export default function WishList() {
  let {getWishList , deleteItem , setCounter ,updateQTY} =  useContext(WishListContext)
  let [data , setData] = useState(null)
  let [loading , setLoading] = useState(true)
  useEffect(()=>{
    (async()=>{

     let data = await getWishList()
     setData(data.data)

     console.log(data);
     setLoading(false)
     

    })()

  },[])

  async function deleteProduct(id){
    let data = await deleteItem(id)
    console.log(data);
    if(data.status=='success'){
     toast.error('Product deleted successfully.');
     setCounter(data.numOfCartItems)
     setData(data)
    }
  }

 
  if (loading) return <Loading/>
  return (
    <div className='container my-2 bg-main-light'>
      <h2>My wish List:</h2>
      {data?.data.products.map(item=>{
        return <div key={item._id} className='row py-2 border-bottom'>
          <div className="col-md-1">
            <img src={item.product.imageCover} className='w-100' alt="" />
          </div>
          <div className="col-md-11 d-flex justify-content-between">
            <div className='d-flex flex-column my-2'>
              <p className='m-1'>{item.product.title}</p>
              <span className='text-main m-0 p-0'>Price:{item.price} EGP</span>
              <button onClick={()=>deleteProduct(item.product._id)} className='btn m-0 p-0'><i className='text-main fa-solid fa-trash-can'></i>Remove</button>
            </div>
            
          </div>
      

        </div>
      })}

      
    </div>
  )
}
