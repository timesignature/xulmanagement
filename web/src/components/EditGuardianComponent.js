import {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {success} from "./ToastComponent";
import {useParams} from "react-router-dom/cjs/react-router-dom";
import useGuardians from "../hooks/useGuardians";
import ParentComponent from "./ParentComponent";

export default function EditGuardianComponent(){


    const {data:parents}=useGuardians()


    const {id}=useParams()


    const [state,setState]=useState({
        guardian:''
    })

    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    const queryClient=useQueryClient()
    const mutation=useMutation(values=>http.post(`/students/guardian/${id}`,values).then(res=>res.data),{
        onSuccess:async()=>{
            setErrors({})
            success('The record has been successfully updated')
            await queryClient.invalidateQueries(['student',id])
        },
        onError:(e)=>{
            setErrors(e.response.data.errors || {})
        }
    })


    const submit=()=>{
        mutation.mutate(state)
    }



    return (
        <div className='w-full'>
            <span className="block text-p-100 text-3xl">Parent/Guardian</span>
            <div className="mt-10">
                <label>
                    <div className="flex items-center justify-between mb-3">
                        <span className="block text-sm">Select Parent</span>
                        <ParentComponent/>
                    </div>
                    <select
                        name={'guardian'}
                        onChange={handleChange}
                        value={state.guardian}
                        className={`input ${errors.guardian ? 'border-red-600' : 'border-zinc-200'}`}
                    >
                        <option value="">Select</option>
                        {
                            parents && parents.map(p=>(
                                <option key={p.id} value={p.id}>{p.name} {p.national_id}</option>
                            ))
                        }

                    </select>
                    {
                        errors.guardian && (
                            <span className="block text-xs mt-3">{errors.guardian[0]}</span>
                        )
                    }
                </label>

                <div className="mt-10">
                    <button onClick={()=>mutation.isLoading ? null : submit()} className="btn btn-primary">
                        {
                            mutation.isLoading ? '...Updating Entry' : 'Update Entry'
                        }
                    </button>
                </div>

            </div>
        </div>
    )


}
