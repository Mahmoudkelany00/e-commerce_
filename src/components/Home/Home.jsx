import React from 'react'
import { useEffect ,useState } from 'react';
import axios from 'axios';
import Product from '../Product/Product';
import FirstHome from '../FirstHome/FirstHome';
import SliderHome from '../SliderHome/SliderHome';
import Loading from '../Loading/Loading';


export default function Home(){
  
  let [products , setProducts] = useState([])
  let [loading , setLoading] = useState(true)
  
    async function getProducts(){
      let{data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      console.log(data.data);
      setProducts(data.data)
      setLoading(false)
      
      }
      useEffect(()=>{
      getProducts()
      
      },[])
      if(loading) return <Loading/>
      return(
        
        <>
        <FirstHome/>
        <SliderHome/>
        
          <div className="container">
            <div className="row">
              {products.map(item=>{
                return <Product item={item} key={item._id}/>
                
              })}
            </div>
          </div>
          
        </>
      )
}
