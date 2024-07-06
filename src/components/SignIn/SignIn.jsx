import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function SignIn() {
    let navigate = useNavigate()
    const [errMsg , setErrorMsg]=useState('')
    const [loading , setLoading]=useState(true)
     function sendDataToApi(values){
        setLoading(false)
         axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).then(({data})=>{
            console.log(data);
            if(data.message=='success'){
              localStorage.setItem('token', data.token)
                navigate('/home')

            }
         }
         ).catch((err)=>{
            setErrorMsg(err.response.data.message)
            setLoading(true)
         })
    }
    function validationSchema(){
        let schema = new Yup.object({
            email:Yup.string().email().required(),
            password:Yup.string().matches(/^[A-Za-z0-9@]{6,}$/).required(),

        })
        return schema
       
    }
    let Login =useFormik({
        initialValues:{
            email : '' ,
            password : '' ,
        },
        validationSchema,
        onSubmit : (values) =>{
            sendDataToApi(values)
        }
    })
    console.log(Login.errors);

    
  return (
    <div>
      <div className="w-75 m-auto my-4">
        <h2>Login Now !</h2>
        <form onSubmit={Login.handleSubmit}>
    

            <label htmlFor="email">Email :</label>
            <input onBlur={Login.handleBlur} placeholder='Type Your Email..' onChange={Login.handleChange} type="email" name='email' className='form-control mb-3' id='email' />
            {Login.errors.email  && Login.touched.email?<div className="alert alert-danger">
    {Login.errors.email}
    </div>
    :''
    }
            <label htmlFor="password">Password :</label>
            <input onBlur={Login.handleBlur} placeholder='Type Your Password..' onChange={Login.handleChange} type="password" name='password' className='form-control mb-3' id='password' />
            {Login.errors.password  && Login.touched.password?<div className="alert alert-danger">
    {Login.errors.password}
    </div>
    :''
    }
       
            <button disabled={!(Login.dirty&&Login.isValid)} type='submit' className='btn bg-danger text-white'>
            {loading? 'Sign In' : <i className='fa-spinner fa-spin'></i>}

            </button>
            {errMsg?<div className="alert alert-danger my-3">{errMsg}</div>:''}
        </form>
      </div>
    </div>
  )
}
