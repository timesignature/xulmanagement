import Layout from "../Layout";
import GoToAddButtonComponent from "../../components/GoToAddButtonComponent";
import useStudents from "../../hooks/useStudents";
import {useState} from "react";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent";
import {Link} from "react-router-dom";
import EmptyComponent from "../../components/EmptyComponent";
import moment from "moment";
import useInvoices from "../../hooks/useInvoices";
import Select from 'react-tailwindcss-select';

export default function Invoice(){


    const {data:students}=useStudents({})

    const [state,setState]=useState({
        student:'',
    })

    const {data:invoices,isLoading,isError}=useInvoices(state)


    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }


    const chang=(e)=>{
        setState(prev=>({...prev,student:e.value}))
    }

    const Rendered=()=>{
        if(isLoading){
            return (
                <LoadingComponent/>
            )
        }

        if(isError){
            return (
                <ErrorComponent/>
            )
        }

        return invoices && (
            <div>
                {
                    invoices.length > 0 ? (
                        <table className="w-full">
                            <thead>
                            <tr className='bg-zinc-50'>
                                <td className='text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Student/Invoice Number</td>
                                <td className='w-32 text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Date Issued</td>
                                <td className='w-20 text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Amount/ Status</td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                invoices.map(s=>(
                                    <tr key={s.id} className='hover:bg-zinc-50'>
                                        <td className='text-xs p-2 border-b border-zinc-200'>
                                            <Link to={`/invoices/${s.id}/payments/${s.student?.id}`}>
                                                <div className="flex items-end space-x-5">
                                                    <div>
                                                        <span className="block text-sm capitalize">{s.student?.fullname}</span>
                                                        <span className="block mt-1">INV-{s.id}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block mt-1">(Receipt No. {s.receipt_number})</span>
                                                    </div>
                                                </div>

                                            </Link>
                                        </td>
                                        <td className='text-xs px-2 py-5 border-b border-zinc-200'>{moment(s.created_at).format('DD MMM YYYY')}</td>
                                        <td className='text-xs px-2 py-5 border-b border-zinc-200'>${(+s.amount).toFixed(2)}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    ) : (
                        <EmptyComponent/>
                    )
                }
            </div>
        )
    }




    return (
        <Layout>
            <div className="p-20">

                <div className="flex items-center justify-between">
                    <div>
                        <span className="block text-4xl">Invoices</span>
                        <span className="block text-xs mt-5">Student Registration and fees allocation</span>
                    </div>

                    <GoToAddButtonComponent url={'/invoices/add'}/>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-8">
                    <div>
                        {/* <label>
                            <span className="block text-xs mb-3">Students</span>
                            <select
                                name="student"
                                onChange={handleChange}
                                className="input"
                                value={state.student}
                            >
                                <option value="">Select</option>
                                {
                                    students && students.map(s=>(
                                        <option key={s.id} value={s.id}>{s.fullname}</option>
                                    ))
                                }
                            </select>
                        </label> */}




                        <Select
                            value={state.student}
                            onChange={chang}
                            options={students && students.map(s=>({value:s.id,label:s.fullname}))}
                        />

                    </div>
                </div>


                <div className="mt-10">
                    <Rendered/>
                </div>

            </div>
        </Layout>
    )
}
