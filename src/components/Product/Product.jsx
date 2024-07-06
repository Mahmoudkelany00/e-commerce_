import React, { useContext, useState } from 'react'
import { CartContext } from '../Context/CartContext'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { WishListContext } from '../Context/WishListContext'

export default function Product({item}) {
  let {counter , setCounter , addToCart,addToWishList} =  useContext(CartContext,WishListContext)
  let [btnLoading , setBtnLoading] = useState(true)

  async function addProductInsideCart(productId){
    setBtnLoading(false)
    let data = await addToCart(productId)
    console.log(data);
    if(data.data.status=='success'){
      toast.success('Product Added Successfully')
      setCounter(data.data.numOfCartItems)
      setBtnLoading(true)

    }
  }

  async function addProductInsideWishList(productId){
    setBtnLoading(false)
    let data = await addToWishList(productId)
    console.log(data);
    if(data.data.status=='success'){
      toast.success('Product Added Successfully')
      setCounter(data.data.numOfCartItems)
      setBtnLoading(true)

    }
  }
  return (
    <>
    <div  className="col-md-2">
            <div className="products cursor-pointer">
              <Link to={'/product-details/' + item._id}>
              <img src={item.imageCover} className='w-100' alt="" />
              <span>
                {item.category.name}
              </span>
              <h6>{item.title.split(' ').slice(0 ,2).join(' ')}</h6>
              <div>
                <div>
                  {item.price}
                </div>
              </div>
              <div className="d-flex">
                <div className='fa fa-star gold'></div>
                <div>
                  {item.ratingsAverage}
                </div>
                <button disabled={!btnLoading} onClick={()=>(addProductInsideWishList(item._id))} className='btn '><i class="fa-regular fa-heart"></i>
                {btnLoading? 'Add To WishList' : 'Loading..'}
                </button>
              </div>
              
              </Link>
                <button disabled={!btnLoading} onClick={()=>(addProductInsideCart(item._id))} className='btn bg-main w-100 text-white'>
                {btnLoading? 'Add To Cart' : 'Loading..'}
                </button>
                
              </div>
            </div>
          
      
    </>
  )
}

