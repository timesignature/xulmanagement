import Layout from "../Layout";
import GoToAddButtonComponent from "../../components/GoToAddButtonComponent";
import useStudents from "../../hooks/useStudents";
import {useState} from "react";
import useFees from "../../hooks/useFees";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent";

import {Link} from "react-router-dom";
import EmptyComponent from "../../components/EmptyComponent";
import moment from "moment";

export default function Fee(){


    const {data:students}=useStudents({})

    const [state,setState]=useState({
        student:'',
    })

    const {data:fees,isLoading,isError}=useFees()


    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
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

        return fees && (
            <div>
                {
                    fees.length > 0 ? (
                        <table className="w-full">
                            <thead>
                            <tr className='bg-zinc-50'>
                                <td width={'20%'} className='text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Student/Invoice Number</td>
                                <td width={'40%'} className='text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Description</td>
                                <td width={'20%'} className='text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Date Issued</td>
                                <td width={'20%'} className='text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Amount/ Status</td>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                fees.map(s=>(
                                    <tr key={s.id} className='hover:bg-zinc-50'>
                                        <td className='text-xs p-2 border-b border-zinc-200'>
                                            <Link to={`/fees/payments/${s.id}`}>
                                                <span className="block">{s.student?.fullname}</span>
                                                <span className="block">INV-{s.id}</span>
                                            </Link>
                                        </td>
                                        <td className='text-xs px-2 py-5 border-b border-zinc-200'>{s.description}</td>
                                        <td className='text-xs px-2 py-5 border-b border-zinc-200'>{moment(s.created_at).format('DD MMM YYYY')}</td>
                                        <td className='text-xs px-2 py-5 border-b border-zinc-200'>${s.term?.amount}</td>
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

                    <GoToAddButtonComponent url={'/fees/add'}/>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-8">
                    <div>
                        <label>
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
                        </label>

                    </div>
                </div>


                <div className="mt-10">
                    <Rendered/>
                </div>

            </div>
        </Layout>
    )
}
