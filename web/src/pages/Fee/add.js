import Layout from "../Layout";
import useStudents from "../../hooks/useStudents";
import {useState} from "react";
import useCurrentTerm from "../../hooks/useCurrentTerm";
import {useHistory} from "react-router-dom";
import {useMutation} from "react-query";
import http from "../../http";
import {success} from "../../components/ToastComponent";
import moment from "moment";
import InvoiceHeadingComponent from "../../components/InvoiceHeadingComponent";

export default function AddFee(){



    const [reference]=useState((Date.now()/2).toFixed(0))

    const [errors,setErrors]=useState({})

    const h=useHistory()

    const mutation=useMutation(values=>http.post('/fees',values).then(res=>res.data),{
        onSuccess:async()=>{
            setErrors({})
            success('a student has been successfully billed and registered, congrats!!!')
            h.push('/fees')
        },
        onError:(e)=>{
            setErrors(e.response.data.errors || {})
        }
    })

    const [student,setStudent]=useState(null)


    const {data:students}=useStudents({
        name:'',
        section:'',
        gender:'',
        religion:'',
    })
    const {data:term}=useCurrentTerm()

    const handleStudent=(e)=>{
        if(e.target.value.length>0){
            setStudent(
                students[e.target.value]
            )
        }
    }


    const submit=()=>{
        mutation.mutate({
            student:student?.id ?? '',
        })
    }



    return (
        <Layout>
            <div className="p-20">

                <div className="flex items-center justify-between">
                    <span className="block text-4xl">Fees Payment</span>
                    <button onClick={()=>mutation.isLoading ? null : submit()} className="btn btn-primary">
                        {
                            mutation.isLoading ? '...Processing Invoice' : 'Process Invoice'
                        }
                    </button>
                </div>

                <div className="mt-10 border border-zinc-100 p-10">
                    <InvoiceHeadingComponent/>

                    <div className="mt-20 grid grid-cols-3 gap-8">
                        <div>
                            <span className="block text-xs mb-3">Billed To</span>
                            {
                                student ? (
                                    <div onClick={()=>setStudent(null)} className='space-y-3 cursor-pointer p-2 border border-zinc-100'>
                                        <span className="block text-xs font-medium">{student.fullname}</span>
                                        <span className="block text-xs">{student.national_id}</span>
                                        <span className="block text-xs">{student.section?.title}</span>
                                    </div>
                                ) : (
                                    <select
                                        onChange={handleStudent}
                                        className={`input ${errors.student ? 'border-red-600' : 'border-zinc-200'}`}
                                    >
                                        <option value="">Select</option>
                                        {
                                            students && students.map((s,i)=>(
                                                <option key={s.id} value={i}>{s.fullname} {s.national_id}</option>
                                            ))
                                        }
                                    </select>
                                )
                            }

                            <div>
                                {
                                    errors.student && (
                                        <span className="block text-xs mt-3 text-red-600">{errors.student}</span>
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <div>
                                <span className="block text-xs mb-3 text-teal-800">Date of Issue {moment(Date.now()).format('YYYY-MM-DD')}</span>
                                <input type="date" disabled value={moment(Date.now()).format('YYYY-MM-DD')} className="text-xs bg-transparent focus:outline-none w-full"/>
                            </div>

                            <div className="mt-10">
                                <span className="block text-xs mb-3 text-teal-800">Due Date</span>
                                <input disabled type="date" value={term ? term?.end : ''} className="text-xs bg-transparent focus:outline-none w-full"/>
                            </div>
                        </div>

                        <div>
                            <div>
                                <span className="block text-xs mb-3 text-teal-800">Invoice No.</span>
                                <input type="text" value={reference}  placeholder={'invoice number'} className="text-xs bg-transparent focus:outline-none w-full"/>
                            </div>

                        </div>
                    </div>

                    <div className="mt-20">
                        <div className="border-t border-p-100"></div>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th width={'40%'} className='text-xs text-left py-5 text-teal-800 font-medium'>Description</th>
                                    <th width={'20%'} className='text-xs text-left py-5 text-teal-800 font-medium'>Rate</th>
                                    <th width={'20%'} className='text-xs text-left py-5 text-teal-800 font-medium'>Qty</th>
                                    <th width={'20%'} className='text-xs text-left py-5 text-teal-800 font-medium'>Line Total</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                term && (
                                    <tr>
                                        <td className="text-xs py-5">Tuition Fees</td>
                                        <td className="text-xs py-5">{term.amount}</td>
                                        <td className="text-xs py-5">1</td>
                                        <td className="text-xs py-5">{term.amount}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                            {
                                term && (
                                    <tfoot>
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td className='text-xs py-5 text-right px-5'>Sub Total</td>
                                        <td className='text-xs py-5 px-5'>${term.amount}</td>
                                    </tr>

                                    <tr>
                                        <td colSpan={2}></td>
                                        <td className='text-xs py-5 text-right px-5 text-teal-700'>Add Discount</td>
                                        <td className='text-xs py-5 px-5'>$0.00</td>
                                    </tr>

                                    <tr>
                                        <td colSpan={2}></td>
                                        <td className='text-xs py-5 text-right px-5'>Tax</td>
                                        <td className='text-xs py-5 px-5'>$0.00</td>
                                    </tr>

                                    <tr>
                                        <td colSpan={2}></td>
                                        <td className='text-xs py-5 text-right px-5 border-t border-zinc-100'>Total</td>
                                        <td className='text-xs py-5 px-5 border-t border-zinc-100'>${term.amount}</td>
                                    </tr>

                                    <tr>
                                        <td colSpan={2}></td>
                                        <td className='text-xs py-5 text-right px-5'>Amount Paid</td>
                                        <td className='text-xs py-5 px-5'>$0.00</td>
                                    </tr>

                                    <tr>
                                        <td colSpan={2}></td>
                                        <td className='text-xs pt-5 text-right px-5 border-t border-zinc-100'>
                                            <span className="block">Amount Due (USD)</span>
                                        </td>
                                        <td className='text-xs pt-5 px-5 border-t border-zinc-100'>${term.amount}</td>
                                    </tr>

                                    <tr>
                                        <td colSpan={2}></td>
                                        <td className='text-xs text-right px-5'>
                                            <span className="block text-teal-700">Request a deposit</span>
                                        </td>
                                        <td className='text-xs px-5'></td>
                                    </tr>


                                    </tfoot>
                                )
                            }
                        </table>
                    </div>


                    <div className="py-20"></div>
                </div>

            </div>
        </Layout>
    )
}
