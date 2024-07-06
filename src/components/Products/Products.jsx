import React from 'react'
import { useEffect ,useState } from 'react';
import axios from 'axios';
import Product from '../Product/Product';
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';
export default function Products() {
  function getProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')

  }
  let {data,isLoading}= useQuery('getProducts',getProducts)
  //to show data in html
  // let [products , setProducts] = useState([])
  // let [loading , setLoading] = useState(true)
  
    // async function getProducts(){
    //   let{data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    //   console.log(data.data);
    //   setProducts(data.data)
    //   setLoading(false)
      
    //   }
    //   useEffect(()=>{
    //   getProducts()
      
    //   },[])
     if(isLoading) return <Loading/>
      return(
    <>
      <div className="container">
        <div className="row">
          {data?.data.data.map(item=>{
            return <Product item={item} key={item._id}/>
          })}
        </div>
      </div>
    </>
      )
}
