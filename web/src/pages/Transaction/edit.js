import Layout from "../Layout";
import InputComponent from "../../components/InputComponent";
import {useEffect, useState} from "react";
import SelectComponent from "../../components/SelectComponent";
import {useHistory, useParams} from "react-router-dom";
import {useMutation} from "react-query";
import http from "../../http";
import {success, warning} from "../../components/ToastComponent";
import useTransaction from "../../hooks/useTransaction";
import TransactionDeleteComponent from "../../components/TransactionDeleteComponent";

export default function EditTransaction(){

    const {id}=useParams()

    const {data:transaction}=useTransaction(id)


    const [state,setState]=useState({
        description:'',
        amount:'',
        type:'',
    })

    useEffect(()=>{
        if(transaction){
            setState(transaction)
        }
    },[transaction])

    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    const h=useHistory()

    const mutation=useMutation(values=>http.put(`/transactions/${id}`,values).then(res=>res.data),{
        onSuccess:async()=>{
            setErrors({})
            success('a transaction has been successfully modified')
            h.push('/transactions')
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
                <span className="block text-4xl">Modify Transactions</span>
                <span className="block text-xs mt-5">Transactions expenses or incomes</span>

                <div className="mt-10 flex">

                    <div className="flex-1">
                        <div className="grid grid-cols-2 gap-8">
                            <div className={'col-span-2'}>
                                <InputComponent
                                    type={'textarea'}
                                    title={'Description'}
                                    name={'description'}
                                    error={errors.description}
                                    value={state.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <InputComponent
                                    title={'Amount'}
                                    name={'amount'}
                                    value={state.amount}
                                    onChange={handleChange}
                                    error={errors.amount}
                                />
                            </div>

                            <div>
                                <SelectComponent
                                    title={'Transaction Type'}
                                    name={'type'}
                                    value={state.type}
                                    onChange={handleChange}
                                    error={errors.type}
                                    data={['expense','income']}
                                />
                            </div>


                            <div className="col-span-2 space-x-5">
                                <button onClick={submit} className='btn bg-p-100 text-white'>
                                    {
                                        mutation.isLoading ? '... Modifying Entry' : 'Modify Entry'
                                    }
                                </button>

                                <TransactionDeleteComponent/>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3"></div>

                </div>
            </div>
        </Layout>
    )
}
