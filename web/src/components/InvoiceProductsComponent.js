import useInvoiceService from "../hooks/useInvoiceService";
import {useParams} from "react-router-dom";
import ProductComponent from "./ProductComponent";
import DeleteInvoiceServiceComponent from "./DeleteInvoiceServiceComponent";
import PaymentComponent from "./PaymentComponent";
import useInvoicePayments from "../hooks/useInvoicePayments";


export default function InvoiceProductsComponent({student}){

    const {id}=useParams()
    const {data:services,refetch}=useInvoiceService(id)
    const {data:payments}=useInvoicePayments(id)

    const subTotal=(val=[])=>{
        let total=0;
        val.forEach(t=>{
            total+=(+t.amount)
        })
        return (+total).toFixed(2)
    }

    const totalPaid=(val=[])=>{
        let total=0;
        val.forEach(t=>{
            total+=(+t.amount)
        })
        return (+total).toFixed(2)
    }

    const setTotal=(cost,paid)=>{
        return  (+(cost-paid)).toFixed(2);
    }

    return (
        <div className="mt-20">
            <div className="px-10 print:hidden">
               <ProductComponent/>
            </div>
            {
                services && (
                    <table className="w-full">
                        <thead>
                        <tr className='bg-zinc-50'>
                            <th className='text-xs text-teal-800 text-left font-bold py-5 px-2 border-b border-zinc-200'>Items</th>
                            <th className='w-32 text-xs text-teal-800 text-left font-bold py-5 px-2 border-b border-zinc-200'>Quantity</th>
                            <th className='w-32 text-xs text-teal-800 text-left font-bold py-5 px-2 border-b border-zinc-200'>Price</th>
                            <th className='w-40 text-xs text-teal-800 text-left font-bold py-5 px-2 border-b border-zinc-200'>Amount</th>
                        </tr>
                        </thead>

                        <tbody>

                        {
                            services.map(s=>(
                                <tr key={s.id}>
                                    <td className='text-xs py-3 px-2 border-b border-zinc-100'>{s.description}</td>
                                    <td className='text-xs py-3 px-2 border-b border-zinc-100'>{1}</td>
                                    <td className='text-xs py-3 px-2 border-b border-zinc-100'>${s.amount}</td>
                                    <td className='text-xs py-3 px-2 border-b border-zinc-100 '>
                                        <div className="w-full flex items-center justify-between">
                                    <span className="block">
                                        ${s.amount}
                                    </span>
                                            <DeleteInvoiceServiceComponent id={s.id} refetch={refetch}/>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }

                        </tbody>



                        <tfoot>
                        <tr>
                            <td className='text-xs text-right px-2 py-5' colSpan={3}>SubTotal</td>
                            <td className='text-xs px-2 py-5'>${subTotal(services)}</td>
                        </tr>

                        <tr>
                            <td className='text-xs text-right px-2 py-5' colSpan={3}>Amount Paid</td>
                            <td className='text-xs px-2 py-5'>${payments && totalPaid(payments)}</td>
                        </tr>

                        <tr>
                            <td className='text-xs font-bold text-right px-2 py-5' colSpan={3}>
                                <span className="block">Total</span>
                            </td>
                            <td className='text-xs px-2 py-5'>${payments && setTotal(subTotal(services),totalPaid(payments))}</td>
                        </tr>

                        <tr className='print:hidden'>
                            <td className='text-xs font-bold text-right px-2 py-5' colSpan={3}>
                                <PaymentComponent student={student}/>
                            </td>
                            <td className='text-xs px-2 py-5'></td>
                        </tr>
                        </tfoot>
                    </table>
                )
            }
        </div>
    )
}
