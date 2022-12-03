import Layout from "../Layout";
import InputComponent from "../../components/InputComponent";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import useStudents from "../../hooks/useStudents";
import moment from "moment";
import useCurrentTerm from "../../hooks/useCurrentTerm";
import {useMutation} from "react-query";
import http from "../../http";
import {success, warning} from "../../components/ToastComponent";

export default function AddInvoice(){




    const {data:trm}=useCurrentTerm()
    const [student,setStudent]=useState(null)
    const {data:students}=useStudents()

    const selectStudent=(e)=>{
        if(e.target.value.length>0){
            setStudent(
                students[e.target.value]
            )
        }
    }



    const currentDate=()=>{
        const current = new Date();
        const date = moment(current).format('YYYY-MM-DD');
        return date;
    }

    const [state,setState]=useState({
        due_date:currentDate(),
        current_date:currentDate(),
        term:'',
        receipt_number:''
    })

    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    const h=useHistory()


    useEffect(()=>{
        if(trm){
            setState(prev=>({...prev,term:trm.id}))
        }
    },[trm])




    const mutation=useMutation(values=>http.post('/invoices',values).then(res=>res.data),{
        onSuccess:async(data)=>{
            setErrors({})
            success('an invoice has been successfully created')
            h.push(`/invoices/${data.id}/payments/${student?.id}`)
        },
        onError:(e)=>{
            warning('something went wrong')
            setErrors(e.response.data.errors || {})
        }
    })


    const submit=()=>{

        mutation.mutate({
            ...state,
            student:student?.id ?? ''
        })
    }


    return (
        <Layout>
            <div className="p-20">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="block text-4xl">New Invoice</span>
                    </div>
                    <div>
                        <button onClick={()=>mutation.isLoading ? null : submit()} className="btn btn-primary">
                            {
                                mutation.isLoading ? '... Saving and Continue' : 'Save and Continue'
                            }
                        </button>
                    </div>
                </div>


                <div className="mt-20 grid grid-cols-3 gap-10">


                    <div>
                        {
                            student ? (
                                <div>
                                    <span className="block text-xs mb-3">Billed To</span>
                                    <div onClick={()=>setStudent(null)} className="flex cursor-pointer flex-col space-y-3 border border-zinc-100 p-5">
                                        <span className="block text-xs font-bold capitalize">{student.fullname}</span>
                                        <span className="block text-xs">{student.gender}</span>
                                        <span className="block text-xs">{student.guardian?.address}</span>
                                        <span className="block text-xs">{student.guardian?.city} {student.guardian?.country}</span>
                                        <span className="block text-xs">{student.guardian?.phone}</span>
                                    </div>
                                </div>
                            ) : (
                                <label>
                                    <span className="block text-xs mb-3">Billed To</span>
                                    <select onChange={selectStudent}  className={`input ${errors.student ? 'border-red-600' : 'border-zinc-200'}`}>
                                        <option value="">Select</option>
                                        {
                                            students && students.map((s,i)=>(
                                                <option key={i} value={i}>{s.fullname}</option>
                                            ))
                                        }
                                    </select>
                                </label>
                            )
                        }

                        <div>
                            {
                                errors.student && (
                                    <span className="block text-xs text-red-600 mt-3">{errors.student[0]}</span>
                                )
                            }
                        </div>



                    </div>

                    <div className='flex flex-col space-y-10'>



                        <InputComponent
                            title={'Term'}
                            name={'term'}
                            value={trm?.description}
                            // error={errors.term}
                            readOnly={true}

                        />

                    </div>

                    <div className='flex flex-col space-y-10'>
                        <InputComponent
                            title={'Invoice Date.'}
                            onChange={handleChange}
                            name={'current_date'}
                            value={state.current_date}
                            error={errors.current_date}
                            type={'date'}
                        />


                        <InputComponent
                            title={'Payment Due'}
                            onChange={handleChange}
                            name={'due_date'}
                            value={state.due_date}
                            error={errors.due_date}
                            type={'date'}
                        />
                    </div>
                </div>




                <div className="py-20"></div>


            </div>
        </Layout>
    )
}
