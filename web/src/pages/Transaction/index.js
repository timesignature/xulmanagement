import Layout from "../Layout";
import GoToAddButtonComponent from "../../components/GoToAddButtonComponent";
import SelectComponent from "../../components/SelectComponent";
import {useState} from "react";
import useTransactions from "../../hooks/useTransactions";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent";
import EmptyComponent from "../../components/EmptyComponent";
import moment from "moment";
import {Link} from "react-router-dom";

export default function Transaction(){





    const [state,setState]=useState({
        type:'',
    })




    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }


    const {data:transactions,isLoading,isError}=useTransactions(state)


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

        return transactions && (
            <div>
                {
                    transactions.length > 0 ? (
                        <table className="w-full">
                            <thead>
                            <tr className='bg-zinc-50'>
                                <td className='text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Description</td>
                                <td className='w-20 text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Amount</td>
                                <td className='w-20 text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Type</td>
                                <td className='w-32 text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Recorded</td>
                               </tr>
                            </thead>
                            <tbody>
                            {
                                transactions.map(s=>(
                                    <tr key={s.id} className='hover:shadow'>
                                        <td className='text-xs px-2 py-5 border-b border-zinc-200'>
                                            <Link to={`/transactions/${s.id}/edit`} className={'text-teal-700'}>
                                                {s.description}
                                            </Link>
                                        </td>
                                        <td className='text-xs px-2 py-5 border-b border-zinc-200'>{s.amount}</td>
                                        <td className='text-xs px-2 py-5 border-b border-zinc-200'>{s.type}</td>
                                        <td className='text-xs px-2 py-5 border-b border-zinc-200'>{moment(s.created_at).format('DD MMM YYYY')}</td>
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
                <div className='flex items-center justify-between'>
                    <div>
                        <span className="block text-4xl">Transactions</span>
                        <span className="block text-xs mt-5">A list of expenses and incomes</span>
                    </div>
                    <GoToAddButtonComponent url={'/transactions/add'}/>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-8">
                    <div>
                        <SelectComponent
                            data={['income','expense']}
                            title={'Transaction Type'}
                            value={state.type}
                            name={'type'}
                            onChange={handleChange}
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
