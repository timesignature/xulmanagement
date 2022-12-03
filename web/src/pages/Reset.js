import {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {useMutation} from "react-query";
import http from "../http";
import {success, warning} from "../components/ToastComponent";
import InputComponent from "../components/InputComponent";
import {Toaster} from "react-hot-toast";

export default function Reset(){


    const {link}=useParams()

    const [state,setState]=useState({
        password:'',
        password_confirm:'',
        link:link
    })

    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    const h=useHistory()

    const mutation=useMutation(values=>http.post('/reset',values).then(res=>res.data),{
        onSuccess:async()=>{

            setErrors({})
            success('an password reset link has been successfully sent to your email address')
            h.push('/login')
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

            <div className="w-full px-5 sm:px-10 md:px-0 md:w-2/3 lg:w-1/2">
                <span className="block text-2xl">
                    Reset your password
                </span>

                <div className="mt-10 bg-white w-full p-10">
                    <span className="block text-base">
                        Create a new password, then login to your account.
                    </span>

                    <div className="mt-10 flex flex-col space-y-7">
                        <InputComponent
                            onChange={handleChange}
                            value={state.password}
                            name={'password'}
                            type={'password'}
                            error={errors.password}
                            title={'New Password'}
                        />

                        <InputComponent
                            onChange={handleChange}
                            value={state.password_confirm}
                            name={'password_confirm'}
                            type={'password'}
                            error={errors.password_confirm}
                            title={'Confirm Password'}
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

            <Toaster/>
        </div>
    )
}
