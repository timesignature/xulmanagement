import Layout from "../Layout";
import InputComponent from "../../components/InputComponent";
import {useEffect, useState} from "react";
import useTotalSalary from "../../hooks/useTotalSalary";
import {useMutation, useQueryClient} from "react-query";
import http from "../../http";
import {success, warning} from "../../components/ToastComponent";
import SalaryComponent from "../../components/SalaryComponent";

export default function Payroll(){


    const {data:total}=useTotalSalary()


    const [state,setState]=useState({
        month:'',
        amount:0,
    })

    const [errors,setErrors]=useState({})

    useEffect(()=>{
        if(total){
            setState(prev=>({...prev,amount:total}))
        }
    },[total])

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }




    const queryClient=useQueryClient()

    const mutation=useMutation(values=>http.post('/salaries',values).then(res=>res.data),{
        onSuccess:async()=>{

            await queryClient.invalidateQueries(['salaries'])
            setErrors({})
            success('salary has been successfully processed')
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
        <Layout>
            <div className="p-20">
                <div>
                    <div>
                        <span className="block text-4xl">Payroll Setup</span>
                        <span className="block text-xs mt-5">
                            Total Salary Expense ${total ? (+total).toFixed(2) : 0.00}
                        </span>
                    </div>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-10">



                    <div>
                        <InputComponent
                            title={'Month'}
                            name={'month'}
                            value={state.month}
                            onChange={handleChange}
                            type={'month'}
                            error={errors.month}
                        />
                    </div>


                    <div>
                        <InputComponent
                            title={'Amount'}
                            name={'amount'}
                            value={state.amount}
                            onChange={handleChange}
                            readOnly={true}
                            error={errors.amount}
                        />
                    </div>

                </div>

                <div className="mt-10">
                    <button onClick={()=>mutation.isLoading ? null : submit()} className="btn btn-primary">
                        {
                            mutation.isLoading ? '...Processing Monthly Payment' : 'Process Monthly Payment'
                        }
                    </button>
                </div>

                <div className="mt-10">
                    <SalaryComponent/>
                </div>
            </div>
        </Layout>
    )
}
