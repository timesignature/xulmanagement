import LoadingComponent from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";
import moment from "moment";
import EmptyComponent from "./EmptyComponent";
import {useParams} from "react-router-dom";
import useInvoicePayments from "../hooks/useInvoicePayments";
import DeletePaymentComponent from "./DeletePaymentComponent";

export default function PaymentListComponent(){
    const {id}=useParams()
    const {data:payments,isLoading,isError,refetch}=useInvoicePayments(id)
    const RenderedPayments=()=>{
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

        return payments && (
            <div>
                {
                    payments.length > 0 ? (
                        <table className="w-full">
                            <thead>
                            <tr className='bg-zinc-50'>
                                <td className='text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Description</td>
                                <td className='w-20 text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Amount</td>
                                <td className='w-32 text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Date Issued</td>
                                <td className='w-12 text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'></td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                payments.map(s=>(
                                    <tr key={s.id} className='hover:bg-zinc-50'>
                                        <td className='text-xs p-2 border-b border-zinc-200'>
                                            {s.description}
                                        </td>
                                        <td className='text-xs px-2 py-5 border-b border-zinc-200'>${s.amount}</td>
                                        <td className='text-xs px-2 py-5 border-b border-zinc-200'>{moment(s.created_at).format('DD MMM YYYY')}</td>

                                        <td>

                                            <DeletePaymentComponent id={s.id} refetch={refetch}/>

                                        </td>
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
        <RenderedPayments/>
    )
}
