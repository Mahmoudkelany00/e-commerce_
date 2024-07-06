import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartContext'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'

export default function Cart() {
  let {getCart , deleteItem , setCounter ,updateQTY} =  useContext(CartContext)
  let [data , setData] = useState(null)
  let [loading , setLoading] = useState(true)
  useEffect(()=>{
    (async()=>{

     let data = await getCart()
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

  async function updateProductQuantity(id,count){
    let data = await updateQTY(id,count)
    console.log(data);
    if(data.status=='success'){
     toast.success('Product updated successfully.');
     setCounter(data.numOfCartItems)
     setData(data)
    }
  }
  if (loading) return <Loading/>
  return (
    <div className='container my-2 bg-main-light'>
      <h2>Shop Cart:</h2>
      <p>Total Cart Price : { data?.data.totalCartPrice} EGP</p>
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
            <div>
              <button onClick={()=>updateProductQuantity(item.product._id , item.count + 1)} className='btn brdr'>+</button>
              <span className='px-2'>{item.count}</span>
              <button disabled={item.count <= 1}  onClick={()=>updateProductQuantity(item.product._id , item.count - 1)} className='btn brdr'>-</button>
            </div>
          </div>
      

        </div>
      })}

      <Link to={`/address/${data.data._id}`} className='btn bg-main my-3 text-white'>Place Order</Link>
    </div>
  )
}
