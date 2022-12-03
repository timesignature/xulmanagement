import useStudentInvoices from "../hooks/useStudentInvoices";
import {Link, useParams} from "react-router-dom";
import LoadingComponent from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";
import EmptyComponent from "./EmptyComponent";
import moment from "moment";

export default function StudentFeeComponent(){


    const {id}=useParams()
    const {data:fees,isLoading,isError}=useStudentInvoices(id)



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
                                <td className='text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Invoice No.</td>
                                <td className='w-32 text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Amount</td>
                                <td className='w-32 text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Issue At</td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                fees.map(s=>(
                                    <tr key={s.id} className='hover:shadow'>
                                        <td className='text-xs px-2 py-5 border-b border-zinc-200'>
                                            <Link to={`/invoices/${s.id}/payments/${s.student?.id}`} className='text-teal-700'>
                                                INV-{s.id}
                                            </Link>
                                        </td>

                                        <td className='text-xs px-2 py-5 border-b border-zinc-200'>${(+s.amount).toFixed(2)}</td>
                                        <td className='text-xs px-2 py-5 border-b border-zinc-200'>{moment(s.created_at).format('MMM YYYY')}</td>

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
        <div>
            <div className="mt-10">
                <span className="block text-3xl text-p-100">Fees</span>
            </div>
            <div className="mt-10">

                <Rendered/>

            </div>
        </div>
    )
}
