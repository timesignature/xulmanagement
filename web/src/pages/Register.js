import InputComponent from "../components/InputComponent";
import {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {useMutation} from "react-query";
import http from "../http";
import {success} from "../components/ToastComponent";
import {Toaster} from "react-hot-toast";

export default function Login(){


    const [state,setState]=useState({
        email:'',
        password:'',
        confirm_password:'',
        name:'',
    })

    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    const h=useHistory()

    const mutation=useMutation(values=>http.post('/register',values).then(res=>res.data),{
        onSuccess:async()=>{
            setErrors({})
            success('your account has been successfully created')
            h.push('/login')
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

            <div className='w-full px-5 sm:px-10 md:px-0 md:w-2/3 lg:w-1/2 py-20'>



            <div className="flex items-center justify-center mb-10">
                    <img className="w-20 h-20  object-cover" src={require('../assets/logo.png')}/>
                </div>


                <span className="block text-3xl">Create your account</span>
                <div className="bg-white mt-5 p-10">
                    <div className='mt-10'>
                        <InputComponent
                            value={state.name}
                            name={'name'}
                            error={errors.name}
                            title={'Username'}
                            onChange={handleChange}
                            type={'text'}

                        />
                    </div>

                    <div className='mt-10'>
                        <InputComponent
                            value={state.email}
                            name={'email'}
                            error={errors.email}
                            title={'Email Address'}
                            onChange={handleChange}
                            type={'email'}

                        />
                    </div>

                    <div className="grid sm:grid-cols-2 sm:gap-4 mt-10">
                        <div>
                            <InputComponent
                                value={state.password}
                                name={'password'}
                                error={errors.password}
                                title={'Password'}
                                onChange={handleChange}
                                type={'password'}

                            />
                        </div>

                        <div className='mt-10 sm:mt-0'>
                            <InputComponent
                                value={state.confirm_password}
                                name={'confirm_password'}
                                error={errors.confirm_password}
                                title={'Confirm Password'}
                                onChange={handleChange}
                                type={'password'}

                            />
                        </div>
                    </div>

                    <div className="mt-10">
                        <button onClick={()=>mutation.isLoading ? null : submit()} className="btn btn-primary">
                            {
                                mutation.isLoading ? '...Sign up' : 'Sign up'
                            }
                        </button>
                    </div>
                </div>

                <div className="mt-10 py-3 border-b border-zinc-200">
                    <Link to={'/login'} className="block text-xs">Having an account? <span className='text-indigo-600 font-medium'>login</span></Link>
                </div>
                <div>
                    <span className="block text-xs py-3 leading-loose">
                        By creating an account you agree to our <span className="text-indigo-600">Terms of Service</span> and <span className="text-indigo-600">Privacy Policy.</span>
                    </span>
                </div>
            </div>
            <Toaster/>

        </div>
    )
}
