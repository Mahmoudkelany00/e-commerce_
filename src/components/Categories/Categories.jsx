import React from 'react'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import Category from '../Category/Category'
import axios from 'axios'

export default function Categories() {
  function getCategories(){
  return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}

let {data , isLoading} = useQuery('getCategories', getCategories)
if(isLoading) return <Loading/>
  return (
    <>
      <div className="container">
      <div className="row my-4">
        {data?.data.data.map(item=>{
          return <Category item ={item} key={item._id}/>
        })}
      </div>
    </div>
      
    </>
  )
}
