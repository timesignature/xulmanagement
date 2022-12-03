import InputComponent from "../components/InputComponent";
import {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {useMutation} from "react-query";
import http from "../http";
import {success} from "../components/ToastComponent";
import {TOKEN_LABEL} from "../config";
import {Toaster} from "react-hot-toast";

export default function Login(){


    const [state,setState]=useState({
        email:'',
        password:'',
    })

    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    const h=useHistory()

    const mutation=useMutation(values=>http.post('/login',values).then(res=>res.data),{
        onSuccess:async(data)=>{
            success('you have been successfully authenticated')
            setErrors({})
            localStorage.setItem(TOKEN_LABEL,data)
            h.push('/')
        },
        onError:(e)=>{
            setErrors(e.response.data.errors || {})
        }
    })


    const submit=()=>{
        mutation.mutate(state)
    }



    return (
        <div className='min-h-screen bg-zinc-100 flex flex-col items-center justify-center font-mont'>

            <div className='w-full px-5 sm:px-10 md:px-0 md:w-2/3 lg:w-1/2'>

                <div>
                <div className="flex items-center justify-center mb-10">
                    <img className="w-20 h-20  object-cover" src={require('../assets/logo.png')}/>
                </div>
                </div>
                <div className="bg-white mt-5 p-10">
                    <div>
                        <InputComponent
                            value={state.email}
                            name={'email'}
                            error={errors.email}
                            title={'Email Address'}
                            onChange={handleChange}
                            type={'email'}

                        />
                    </div>

                    <div className='mt-10'>
                        <InputComponent
                            value={state.password}
                            name={'password'}
                            error={errors.password}
                            title={'Password'}
                            onChange={handleChange}
                            type={'password'}

                        />
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:space-x-5 md:space-x-10">
                        <button onClick={submit} className="btn btn-primary">
                            {
                                mutation.isLoading ? '...Login' : 'Login'
                            }
                        </button>

                        <span onClick={()=>h.push('/forgot')} className='text-xs mt-10 sm:mt-0 font-medium text-indigo-700 cursor-pointer'>Forgot Password?</span>
                    </div>
                </div>

                <div className="mt-10">
                    <Link to={'/sign-in'} className="block text-xs">New to XMS? <span className='text-indigo-600 font-medium'>Sign up</span></Link>
                </div>
            </div>

            <Toaster/>
        </div>
    )
}
