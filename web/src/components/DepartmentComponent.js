import {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {success, warning} from "./ToastComponent";
import InputComponent from "./InputComponent";

export default function DepartmentComponent(){

    const [state,setState]=useState({
        title:'',
    })

    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }


    const queryClient=useQueryClient()

    const mutation=useMutation(values=>http.post('/departments',values).then(res=>res.data),{
        onSuccess:async()=>{
            await queryClient.invalidateQueries(['departments'])
            setErrors({})
            setState({
                title: ''
            })
            success('department has been successfully created')
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
        <div>
            <span className="block text-3xl text-p-100">Department</span>

            <div className="mt-5">
                <InputComponent
                    title={'Title'}
                    name={'title'}
                    value={state.title}
                    error={errors.title}
                    onChange={handleChange}
                />
            </div>
            <div className="mt-5">
                <button onClick={()=>mutation.isLoading ? null : submit()} className='btn btn-primary'>
                    {
                        mutation.isLoading ? '...Saving new entry' : 'Save new entry'
                    }
                </button>
            </div>
        </div>
    )
}

