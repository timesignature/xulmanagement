import InputComponent from "../components/InputComponent";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import {useMutation} from "react-query";
import http from "../http";
import {success, warning} from "../components/ToastComponent";
import {Toaster} from "react-hot-toast";

export default function Forgot(){

    const [state,setState]=useState({
        email:'',
        isSuccess:false
    })

    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    const h=useHistory()

    const mutation=useMutation(values=>http.post('/forgot',values).then(res=>res.data),{
        onSuccess:async()=>{
            setErrors({})
            success('an password reset link has been successfully sent to your email address')
            setState(prev=>({...prev,isSuccess:true}))
        },
        onError:(e)=>{
            warning()
            setErrors(e.response.data.errors || {})
        }
    })


    const submit=()=>{
        mutation.mutate(state)
    }


    return (
        <div className='min-h-screen font-mont flex flex-col items-center justify-center bg-zinc-100'>

            {
                state.isSuccess ? (
                    <div className="w-full px-5 sm:px-10 md:px-0 md:w-2/3 lg:w-1/2">

                        <div className="mt-10 bg-white w-full p-10">
                            <div className="flex items-center justify-center">
                                <div className="w-24 h-16 relative border border-zinc-50">
                                    <div className="absolute top-0 right-0 -mt-2 -mr-2 w-5 h-5 bg-red-600 rounded-full items-center justify-center flex text-xs text-white font-bold">1</div>
                                    <div className="w-full h-full shadow-xl bg-white"></div>
                                </div>
                            </div>
                            <span className="block text-center text-xl font-medium mt-10">
                                Check your email
                            </span>

                            <span className="block text-sm text-center leading-loose p-5">
                                We just sent you an email with instructions for resetting your
                                password. If you don't receive an email,
                                <span onClick={()=>setState(prev=>({...prev,isSuccess: false}))} className='text-indigo-600 cursor-pointer'>try again with a different username or email address</span> or <span onClick={()=>h.push('/login')} className="text-indigo-600 cursor-pointer">log in</span>.
                            </span>
                        </div>

                    </div>
                ) : (
                    <div className="w-full px-5 sm:px-10 md:px-0 md:w-2/3 lg:w-1/2">
                <span className="block text-2xl">
                    Reset your password
                </span>

                        <div className="mt-10 bg-white w-full p-10">
                    <span className="block text-base">
                        Enter a valid email or username to receive instructions on how to reset your password.
                    </span>

                            <div className="mt-10">
                                <InputComponent
                                    onChange={handleChange}
                                    value={state.email}
                                    name={'email'}
                                    type={'email'}
                                    error={errors.email}
                                    title={'Email or username'}
                                />
                            </div>

                            <div className="mt-10">
                                <button onClick={()=>mutation.isLoading ? null : submit()} className="btn btn-primary">
                                    {
                                        mutation.isLoading ? '... Resetting Password' : 'Reset Password'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            <Toaster/>
        </div>
    )
}
