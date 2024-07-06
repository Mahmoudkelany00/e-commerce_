import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function SignUp() {
    let navigate = useNavigate()
    const [errMsg , setErrorMsg]=useState('')
    const [loading , setLoading]=useState(true)
     function sendDataToApi(values){
        setLoading(false)
         axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).then(({data})=>{
            console.log(data);
            if(data.message=='success'){
                navigate('/sign')

            }
         }
         ).catch((err)=>{
            setErrorMsg(err.response.data.message)
            setLoading(true)
         })
    }
    function validationSchema(){
        let schema = new Yup.object({
            name:Yup.string().min(2).max(20).required(),
            email:Yup.string().email().required(),
            password:Yup.string().matches(/^[A-Za-z0-9@]{6,}$/).required(),
            rePassword:Yup.string().oneOf([Yup.ref('password')]).required(),

        })
        return schema
       
    }
    let register =useFormik({
        initialValues:{
            name : '' ,
            email : '' ,
            password : '' ,
            rePassword : ''
        },
        validationSchema,
        onSubmit : (values) =>{
            sendDataToApi(values)
        }
    })
    console.log(register.errors);

    
  return (
    <div>
      <div className="w-75 m-auto my-4">
        <h2>Register Now !</h2>
        <form onSubmit={register.handleSubmit}>
            <label htmlFor="name">Name :</label>
            <input onBlur={register.handleBlur} placeholder='Type Your Name..' onChange={register.handleChange} type="text" name='name' className='form-control mb-3' id='name' />
{register.errors.name && register.touched.name?<div className="alert alert-danger">
    {register.errors.name}
    </div>
    :''
    }

            <label htmlFor="email">Email :</label>
            <input onBlur={register.handleBlur} placeholder='Type Your Email..' onChange={register.handleChange} type="email" name='email' className='form-control mb-3' id='email' />
            {register.errors.email  && register.touched.email?<div className="alert alert-danger">
    {register.errors.email}
    </div>
    :''
    }
            <label htmlFor="password">Password :</label>
            <input onBlur={register.handleBlur} placeholder='Type Your Password..' onChange={register.handleChange} type="password" name='password' className='form-control mb-3' id='password' />
            {register.errors.password  && register.touched.password?<div className="alert alert-danger">
    {register.errors.password}
    </div>
    :''
    }
            <label htmlFor="rePassword">RePassword :</label>
            <input onBlur={register.handleBlur} placeholder='Type Your RePassword..' onChange={register.handleChange} type="password" name='rePassword' className='form-control mb-3' id='rePassword' />
            {register.errors.rePassword  && register.touched.rePassword?<div className="alert alert-danger">
    {register.errors.rePassword}
    </div>
    :''
    }
            <button disabled={!(register.dirty&&register.isValid)} type='submit' className='btn bg-danger text-white'>
            {loading? 'Sign Up' : <i className='fa-spinner fa-spin'></i>}

            </button>
            {errMsg?<div className="alert alert-danger my-3">{errMsg}</div>:''}
        </form>
      </div>
    </div>
  )
}
