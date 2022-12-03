import {useHistory, useParams} from "react-router-dom";
import Layout from "../Layout";
import {useEffect, useState} from "react";
import {useMutation} from "react-query";
import http from "../../http";
import {success, warning} from "../../components/ToastComponent";
import useUser from "../../hooks/useUser";

export default function EditUser(){
    const {id}=useParams()

    const {data:user}=useUser(id)

    const [state,setState]=useState({
        is_active:'',
        is_admin:''
    })

    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }


    useEffect(()=>{
        if(user){
            setState(user)
        }
    },[user])

    const h=useHistory()
    const mutation=useMutation(values=>http.put(`users/${id}`,values).then(res=>res.data),{
        onSuccess:()=>{
            success('permissions has been successfully been entered')
            h.push('/users')
        },
        onError:(e)=>{
            warning('something went wrong')
            setErrors(e.response.data.errors || {})
        }
    })

    const submit=()=>{
        mutation.mutate(state)
    }


    return (
        <Layout>
            <div className="p-20">
                <span className="block text-4xl">
                    Modify User Permissions
                </span>

                <div className="mt-10 w-3/4">
                    <div>
                        <label>
                            <span className="block text-xs mb-3">Activate User</span>
                            <select
                                name={'is_active'}
                                onChange={handleChange}
                                value={state.is_active}
                                className={`input ${errors.is_active ? 'border-red-600' : 'border-zinc-200'}`}
                            >
                                <option value="">Select</option>
                                <option value={1}>True</option>
                                <option value={0}>False</option>
                            </select>
                            {
                                errors.is_active && (
                                    <span className="block text-xs text-red-600 mt-3">{errors.is_active[0]}</span>
                                )
                            }
                        </label>
                    </div>

                    <div className="mt-10">
                        <label>
                            <span className="block text-xs mb-3">Admin Permission</span>
                            <select
                                name={'is_admin'}
                                onChange={handleChange}
                                value={state.is_admin}
                                className={`input ${errors.is_admin ? 'border-red-600' : 'border-zinc-200'}`}
                            >
                                <option value="">Select</option>
                                <option value={1}>True</option>
                                <option value={0}>False</option>
                            </select>
                            {
                                errors.is_admin && (
                                    <span className="block text-xs text-red-600 mt-3">{errors.is_admin[0]}</span>
                                )
                            }
                        </label>
                    </div>

                    <div className="mt-10">
                        <button onClick={submit} className="btn bg-p-100 text-white">
                            {
                                mutation.isLoading ? '... Modifying entry' : 'Modify entry'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
