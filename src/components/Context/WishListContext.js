
import axios from 'axios'
import { createContext , useState } from 'react'
export const WishListContext = createContext(0)

async function addToWishlist(productId){
   return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {productId} , {
    headers:{
        token:localStorage.getItem('token')
    }
}).then(data => data).catch(error => error)
}

async function getWishList(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
     headers:{
         token:localStorage.getItem('token')
     }
 }).then(data => data).catch(error => error)
 }

//  async function deleteItem(productId){
//   return axios.delete('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
//    headers:{
//        token:localStorage.getItem('token')
//    }
// }).then(data => data).catch(error => error)
// }



export default function WishListContextProvider({children}) {
    let [counter , setCounter] = useState(0)
  return <WishListContext.Provider value={{counter , setCounter,getWishList , addToWishlist}}>
    {children   }

  </WishListContext.Provider>
}
