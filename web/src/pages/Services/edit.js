import Layout from "../Layout";
import {useEffect, useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import http from "../../http";
import {success, warning} from "../../components/ToastComponent";
import InputComponent from "../../components/InputComponent";
import {useHistory, useParams} from "react-router-dom";
import useService from "../../hooks/useService";
import ToggleButton from "../../components/ToggleButton";

export default function EditServices(){



    const {id}=useParams()
    const {data:service}=useService(id)


    const [state,setState]=useState({
        description:'',
        amount:'',
        isActive:0
    })



    useEffect(()=>{

        if(service){
            setState(service)
        }

    },[service])



    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }


    const h=useHistory()
    const queryClient=useQueryClient()
    const mutation=useMutation(values=>http.put(`/services/${id}`,values).then(res=>res.data),{
        onSuccess:async()=>{
            await queryClient.invalidateQueries(['services'])
            success('an entry has been modified')
            h.push('/services')
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

                <div>
                    <span className="block text-4xl">Services</span>
                    <span className="block mt-5 text-xs">modify services</span>
                </div>

                <div className="mt-10 w-3/4 grid grid-cols-2 gap-8">
                    <div className="col-span-2">
                        <InputComponent
                            onChange={handleChange}
                            title={'Description'}
                            name={'description'}
                            error={errors.description}
                            value={state.description}
                            type={'textarea'}
                        />
                    </div>


                    <div className='col-span-2'>
                        <span className="block text-xs mb-3">Set Default</span>
                        <ToggleButton
                            toggle={state.isActive}
                            setToggle={val=>setState(prev=>({...prev,isActive: val}))}
                        />
                    </div>


                    <div>
                        <InputComponent
                            onChange={handleChange}
                            title={'Amount'}
                            name={'amount'}
                            error={errors.amount}
                            value={state.amount}
                        />
                    </div>
                </div>

                <div className="mt-10">
                    <button onClick={()=>mutation.isLoading ? null : submit()} className="btn bg-p-100 text-white">
                        {
                            mutation.isLoading ? '...Modifying entry' : 'Modify entry'
                        }
                    </button>
                </div>

            </div>
        </Layout>
    )
}
