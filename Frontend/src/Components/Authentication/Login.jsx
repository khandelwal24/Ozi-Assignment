import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { GiToaster } from 'react-icons/gi';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

// import {useDispatch, useSelector} from 'react-redux'
// import { setAuthUser } from '../Redux/UserSlice.jsx';

const Login = () => {

  const [pass,setPass] = useState(false);
//   const dispatch = useDispatch();
//   const {authUser} = useSelector(store=>store.user);
  

  const navigate = useNavigate();

  const [info,setInfo] = useState({
    email:'',
    password:''
  })

  const getVal = (e) =>{
    const oldValue = {...info}
    const Inputname = e.target.name
    const InputVal = e.target.value
    oldValue[Inputname] = InputVal
    setInfo(oldValue)
  }

  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    // console.log(info);

    try{
      const res = await axios.post('http://localhost:1000/api/v1/user/login',info,{headers:{"Content-Type":'application/json'}, withCredentials:true})
        if(res?.data?.success){
          toast.success(res?.data?.message);
          setInfo({
            email:'',
            password:''
          })
          setTimeout(()=>navigate('/'),1000);
        }
    }
    catch(error){
        toast.error(error.response?.data.message);
      console.log('Error Occured',error);
    }
  }

//   useEffect(()=>{
//     if(authUser) navigate('/');
//   },[]);

  return (
    <div className='h-screen w-screen flex items-center justify-center mx-auto'>
    <div className='w-full px-4 text-white'>
    <ToastContainer position='top-center' theme='dark' autoClose={1000}/>
    <div className='max-w-100 w-full mx-auto bg-gray-800 border backdrop-blur-lg  bg-opacity-80  rounded-lg p-3' style={{boxShadow:'2px 2px 3px red, -2px -2px 2px red'}}>
        <h1 className='text-center font-bold text-3xl text-white mt-3 mb-5'>Log in</h1>
        <form onSubmit={onSubmitHandler}>


        <p className='mb-4'> 
        <label className='block'>Email</label>
        <input name='email' value={info.email} onChange={getVal} type='text' placeholder='Enter email' required className='p-2.5 bg-transparent border outline-none rounded-md w-full'/>
        </p>

        <p className='mb-4 relative'>
        <label className='block'>Password</label>
        <input name='password' value={info.password} onChange={getVal} type={pass?'text':'password'} placeholder='Enter password' required className='p-2.5 bg-transparent border outline-none rounded-md w-full'/>
        {pass ? <FaEye onClick={()=>setPass(!pass)} className='hover:cursor-pointer text-2xl absolute bottom-2.5 right-2'/> : <FaEyeSlash onClick={()=>setPass(!pass)} className='hover:cursor-pointer text-2xl absolute bottom-2 right-2' />}      
        </p>


    <button className='text-center bg-red-900 hover:bg-red-700 text-white font-semibold rounded-md w-full p-1.5'>Login</button>
    <p className='text-right my-2 text-xs'>Don't have an Account? <NavLink className='text-red-500 hover:underline' to={'/register'}>SignUp</NavLink> </p>
    </form>
    </div>
    </div>
    </div>
  )
}

export default Login