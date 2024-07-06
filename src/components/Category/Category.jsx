import React from 'react'
import { Link } from 'react-router-dom'
export default function Category({item}) {
  return (
    <>
    <div className="col-md-4">
        <div className="Category cursor-pointer p-3 rounded-3 mb-2">
            <Link rel="stylesheet" to={'/product-of-brand/' +item._id}>
             <div className="myCategory">
             <img src={item.image} className='w-100' alt="" />
              <h2 className='text-center'>{item.name.split(' ').join(' ')}</h2>
             </div>
              </Link>
        </div>
    </div>
      
      
    </>
  )
}
