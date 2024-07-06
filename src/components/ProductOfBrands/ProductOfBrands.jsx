import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import Product from '../Product/Product'
import { useParams } from 'react-router-dom'

export default function ProductOfBrands() {
  let x = useParams()
  let [productsOf , setProductsOf]=useState({})
  let [loading,setLoading]=useState(true)
  async function getProductsFromBrands(){
    let {data} = await axios.get(`http://ecommerce.routemisr.com/api/v1/products?brand=${x.id}`)
    setProductsOf(data.data)
    setLoading(false)
  }
  useEffect(()=>{
    getProductsFromBrands()
  },[])
  if (loading) return <Loading/>
  return (
    <>
      <div className="container">
        <div className="row my-4">
          {productsOf.map(item=>{
            return <Product item={item} key={item._id}/>
          })}
        </div>
      </div>
    </>
  )
}
